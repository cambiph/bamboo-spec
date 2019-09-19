const yaml = require('yaml');
const fs = require('fs');

const planProjectKey = 'PCAM';
const planKey = 'ABC';
const planName = 'Test';

const jobKey = 'XYZ';

const permissionPlanKey = planKey;

function parseTemplate(fileName) {
    const file = fs.readFileSync(fileName, 'utf8');
    return yaml.parseDocument(file);
}

const spec = parseTemplate('templates/spec-template.yml').contents;
const permissions = parseTemplate('templates/permissions-template.yml').contents;

const plan = spec.get('plan');

plan.set('project-key', planProjectKey);
plan.set('key', planKey);
plan.set('name', planName);

const job = spec.get('Build docker')
job.set('key', jobKey);

permissions.get('plan').set('key', permissionPlanKey);

const specs = yaml.stringify(spec);
fs.writeFileSync('bamboo-specs/bamboo.yml', specs);

const permissions0 = yaml.stringify(permissions);
fs.writeFileSync('bamboo-specs/permissions.yml', permissions0)
