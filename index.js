const { exec } = require('child_process');

function checkVersions(nodeMajorVersion, npmMajorVersion) {
  // Get Node.js version
  const nodeVersion = process.versions.node.split('.');
  const nodeMajor = parseInt(nodeVersion[0], 10);

  // Get npm version
  exec('npm -v', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error getting npm version: ${error}`);
      return;
    }
    const npmVersion = stdout.trim().split('.');
    const npmMajor = parseInt(npmVersion[0], 10);

    // Print versions
    console.log(`Node.js version: ${nodeMajor}.${nodeVersion[1]}.${nodeVersion[2]}`);
    console.log(`npm version: ${npmMajor}.${npmVersion[1]}.${npmVersion[2]}`);

    // Check Node.js version
    if (nodeMajor < nodeMajorVersion) {
      console.error(`Node.js major version is below ${nodeMajorVersion}. Exiting.`);
      process.exit(1);
    } else if (nodeMajor > nodeMajorVersion) {
      console.warn(`Node.js major version is above ${nodeMajorVersion}. Consider testing for compatibility.`);
    }

    // Check npm version
    if (npmMajor < npmMajorVersion) {
      console.error(`npm major version is below ${npmMajorVersion}. Exiting.`);
      process.exit(1);
    } else if (npmMajor > npmMajorVersion) {
      console.warn(`npm major version is above ${npmMajorVersion}. Consider testing for compatibility.`);
    }
  });
}

// Example usage
checkVersions(18, 10);
