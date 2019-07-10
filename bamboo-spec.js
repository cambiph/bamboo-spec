const yaml = require('js-yaml')
const fs = require('fs');

const options = { lineWidth: 200 }
const content = {
    "project":
    {
        "key": "PCAM",
        "plan":
        {
            "name": "bamboo-spec-test",
            "key": "TEST"
        }
    },
    "stages": [{
        "jobs": [{
            "scripts": [
                "/opt/scripts/git/git-repository-information-restore.sh",
                "cp ${bamboo.gitconfig_path} ${bamboo.build.working.directory}",
                "cp ${bamboo.npmrc_path} ${bamboo.build.working.directory}",
                "cp ${bamboo.gitcredentials_path} ${bamboo.build.working.directory}",
                "docker build --build-arg VERSION=patch --build-arg REPO=${bamboo.planRepository.repositoryUrl} --no-cache .",
                "/opt/scripts/docker/stop-docker-containers.sh"
            ], "requirements": ["REMOTE_ONLY"] 
        }]
    }]
}

const fileContent = yaml.safeDump(content, options);
fs.writeFile('./bamboo-specs/bamboo.yml', fileContent, (err) => {
    if (err) throw err;
    console.log('File has been saved!');
})
