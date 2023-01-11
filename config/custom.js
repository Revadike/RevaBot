/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.custom = {

    /** ************************************************************************
     *                                                                         *
     * The base URL to use during development.                                 *
     *                                                                         *
     * • No trailing slash at the end                                          *
     * • `http://` or `https://` at the beginning.                             *
     *                                                                         *
     * > This is for use in custom logic that builds URLs.                     *
     * > It is particularly handy for building dynamic links in emails,        *
     * > but it can also be used for user-uploaded images, webhooks, etc.      *
     *                                                                         *
     **************************************************************************/
    "baseUrl": "http://localhost",

    /** ************************************************************************
     *                                                                         *
     * Display dates for your app                                              *
     *                                                                         *
     * > This is here to make it easier to change out the copyright date       *
     * > that is displayed all over the app when it's first generated.         *
     *                                                                         *
     **************************************************************************/
    "platformCopyrightYear": "2021",

    /** ************************************************************************
     *                                                                         *
     * The TTL (time-to-live) for various sorts of tokens before they expire.  *
     *                                                                         *
     **************************************************************************/
    "passwordResetTokenTTL": 24 * 60 * 60 * 1000, // 24 hours
    "emailProofTokenTTL":    24 * 60 * 60 * 1000, // 24 hours

    /** ************************************************************************
     *                                                                         *
     * The extended length that browsers should retain the session cookie      *
     * if "Remember Me" was checked while logging in.                          *
     *                                                                         *
     **************************************************************************/
    "rememberMeCookieMaxAge": 30 * 24 * 60 * 60 * 1000, // 30 days

    /** ************************************************************************
     *                                                                         *
     * Automated email configuration                                           *
     *                                                                         *
     * Sandbox Sendgrid credentials for use during development, as well as any *
     * other default settings related to "how" and "where" automated emails    *
     * are sent.                                                               *
     *                                                                         *
     * (https://app.sendgrid.com/settings/api_keys)                            *
     *                                                                         *
     **************************************************************************/
    // sendgridSecret: 'SG.fake.3e0Bn0qSQVnwb1E4qNPz9JZP5vLZYqjh7sn8S93oSHU',
    // --------------------------------------------------------------------------
    // /\  Configure this to enable support for automated emails.
    // ||  (Important for password recovery, verification, contact form, etc.)
    // --------------------------------------------------------------------------

    // The sender that all outgoing emails will appear to come from.
    "fromEmailAddress": "revabot@revadike.com",
    "fromName":         "RevaBot",

    // Whether to require proof of email address ownership any time a new user
    // signs up, or when an existing user attempts to change their email address.
    "verifyEmailAddresses": false,

    /** *************************************************************************
     *                                                                          *
     * Any other custom config this Sails app should use during development.    *
     *                                                                          *
     ***************************************************************************/
    // …

};
