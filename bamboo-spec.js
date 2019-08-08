const yaml      = require('js-yaml')
const fs        = require('fs');
const package   = require('../../package.json');
const options   = { lineWidth: 200 }

let json;

function readPackageJson() {
    json = JSON.parse(package);
}

const key       = "PCAM"
const planName  =  json.name
const planKey   = "TEST"

console.log(json.name)

const content = {
    "project":
    {
        "key": key,
        "plan":
        {
            "name": planName,
            "key": planKey
        }
    },
    "stages": [{
        "jobs": [{
            "scripts": [
                "/opt/scripts/git/git-repository-information-restore.sh",
                "docker run -e GIT_REPO=${bamboo_repository_git_repositoryUrl} -e RELEASE_VERSION=${bamboo.release_version} acd-docker.repository.milieuinfo.be/milieuinfo/wc-release:1.0.0",
                "/opt/scripts/docker/stop-docker-containers.sh"
            ], "requirements": ["REMOTE_ONLY"] 
        }]
    }]
}

const yamlFile = yaml.safeDump(content, options);

fs.writeFile('../../bamboo-specs/bamboo.yml', yamlFile, 'utf8', (err) => {
    if (err) throw err;
    console.log('File has been saved!');
})
