const fs = require('fs')
const path = require('path')

function writeBuildTime() {
  const now = new Date(Date.now() + 8 * 60 * 60 * 1000) // Add 8 hours
  const buildTime = now.toISOString().slice(0, 19).replace('T', ' ') // Format to YYYY-MM-DD HH:MM:SS
  const content = JSON.stringify({ buildTime }, null, 2)
  const targetPath = path.join(__dirname, '..', 'public', 'build-info.json')
  fs.mkdirSync(path.dirname(targetPath), { recursive: true })
  fs.writeFileSync(targetPath, content, 'utf8')
}

writeBuildTime()
