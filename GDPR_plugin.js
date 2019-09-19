import { Box } from "./GDPR_plugin/box.js";

(function () {
    let box = new Box({title: "GDPR consent", content: "Under the Google EU User Consent Policy, you must make certain disclosures to your users in the European Economic Area (EEA) and obtain their consent for the use of cookies or other local storage and for the use of personalised ads. This policy reflects the requirements of the EU"});
    box.build();
})();