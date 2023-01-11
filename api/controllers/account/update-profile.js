module.exports = {

    "friendlyName": "Update profile",
    "description":  "Update the profile for the logged-in user.",
    "inputs":       {
        "name":         { "type": "string" },
        "emailAddress": { "type": "string" },
    },
    "exits": {
        "emailAlreadyInUse": {
            "statusCode":  409,
            "description": "The provided email address is already in use.",
        },
    },
    "fn": async function fn({ name, emailAddress }) {
        let newEmailAddress = emailAddress;
        if (newEmailAddress !== undefined) {
            newEmailAddress = newEmailAddress.toLowerCase();
        }

        // Determine if this request wants to change the current user's email address,
        // revert her pending email address change, modify her pending email address
        // change, or if the email address won't be affected at all.
        let desiredEmailEffect;// ('change-immediately', 'begin-change', 'cancel-pending-change', 'modify-pending-change', or '')
        if (
            newEmailAddress === undefined
      || (this.req.me.emailStatus !== "change-requested" && newEmailAddress === this.req.me.emailAddress)
      || (this.req.me.emailStatus === "change-requested" && newEmailAddress === this.req.me.emailChangeCandidate)
        ) {
            desiredEmailEffect = "";
        } else if (this.req.me.emailStatus === "change-requested" && newEmailAddress === this.req.me.emailAddress) {
            desiredEmailEffect = "cancel-pending-change";
        } else if (this.req.me.emailStatus === "change-requested" && newEmailAddress !== this.req.me.emailAddress) {
            desiredEmailEffect = "modify-pending-change";
        } else if (!sails.config.custom.verifyEmailAddresses || this.req.me.emailStatus === "unconfirmed") {
            desiredEmailEffect = "change-immediately";
        } else {
            desiredEmailEffect = "begin-change";
        }

        // If the email address is changing, make sure it is not already being used.
        if (_.contains(["begin-change", "change-immediately", "modify-pending-change"], desiredEmailEffect)) {
            let conflictingUser = await User.findOne({
                "or": [
                    { "emailAddress": newEmailAddress },
                    { "emailChangeCandidate": newEmailAddress },
                ],
            });
            if (conflictingUser) {
                throw "emailAlreadyInUse";
            }
        }

        // Start building the values to set in the db.
        // (We always set the name if provided.)
        let valuesToSet = { name };

        switch (desiredEmailEffect) {
            // Change now
            case "change-immediately":
                _.extend(valuesToSet, {
                    "emailAddress":             newEmailAddress,
                    "emailChangeCandidate":     "",
                    "emailProofToken":          "",
                    "emailProofTokenExpiresAt": 0,
                    "emailStatus":              this.req.me.emailStatus === "unconfirmed" ? "unconfirmed" : "confirmed",
                });
                break;

                // Begin new email change, or modify a pending email change
            case "begin-change":
            case "modify-pending-change":
                _.extend(valuesToSet, {
                    "emailChangeCandidate":     newEmailAddress,
                    "emailProofToken":          await sails.helpers.strings.random("url-friendly"),
                    "emailProofTokenExpiresAt": Date.now() + sails.config.custom.emailProofTokenTTL,
                    "emailStatus":              "change-requested",
                });
                break;

                // Cancel pending email change
            case "cancel-pending-change":
                _.extend(valuesToSet, {
                    "emailChangeCandidate":     "",
                    "emailProofToken":          "",
                    "emailProofTokenExpiresAt": 0,
                    "emailStatus":              "confirmed",
                });
                break;

        // Otherwise, do nothing re: email
        }

        // Save to the db
        await User.updateOne({ "id": this.req.me.id })
            .set(valuesToSet);

        // If an email address change was requested, and re-confirmation is required,
        // send the "confirm account" email.
        if (desiredEmailEffect === "begin-change" || desiredEmailEffect === "modify-pending-change") {
            await sails.helpers.sendTemplateEmail.with({
                "to":           newEmailAddress,
                "subject":      "Your account has been updated",
                "template":     "email-verify-new-email",
                "templateData": {
                    "name":  name || this.req.me.name,
                    "token": valuesToSet.emailProofToken,
                },
            });
        }
    },

};
