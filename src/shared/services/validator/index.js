import FormRules from "./FormRules";

export default class FormValidator {
    static make = (descriptor, labeled) => values => {
        const errors = {};
        Object.keys(descriptor).forEach(key =>
            getRules(descriptor, key).forEach(rule =>
                applyRule(errors, rule, key, FormRules, labeled, values)
            )
        );
        return errors;
    };
}

const getRules = (descriptor, key) => descriptor[key].split("|");

const applyRule = (errors, rule, key, formRules, labeled, values) => {
    if (typeof errors[key] !== "undefined") return;

    const ruleMap = getRuleMap(rule);
    const ruleName = getRuleName(ruleMap);
    const ruleParams = getRuleParams(ruleMap);

    if (ruleExists(formRules, ruleName)) {
        return formRules[ruleName](rule, key, labeled, values[key], ruleParams, errors);
    }

    throw new Error("Invalid Rule: " + rule);
};

const getRuleMap = rule => rule.split(":");

const getRuleName = ruleMap => ruleMap[0];

const getRuleParams = ruleMap =>
    ruleMap.length > 1 ? ruleMap[1].split(",") : [];

const ruleExists = (formRules, ruleName) => !!formRules[ruleName];