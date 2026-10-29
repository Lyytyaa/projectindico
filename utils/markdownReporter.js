const fs = require('fs');
const path = require('path');

/**
 * Strip terminal ANSI color/formatting escape sequences (e.g. \x1b[31m)
 */
function stripAnsi(str) {
  if (!str) return '';
  return String(str).replace(
    // eslint-disable-next-line no-control-regex
    /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
    ''
  );
}

/**
 * Format Playwright error message cleanly for a single-line Markdown table cell
 */
function formatErrorForMarkdown(errorObj) {
  if (!errorObj || !errorObj.message) return null;
  const cleanLines = stripAnsi(errorObj.message)
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = cleanLines[0] || 'Test failed';
  const expectedLine = cleanLines.find((l) => l.startsWith('Expected'));
  const receivedLine = cleanLines.find((l) => l.startsWith('Received'));

  const parts = [firstLine];
  if (expectedLine) parts.push(expectedLine);
  if (receivedLine) parts.push(receivedLine);

  return parts.join(' | ').replace(/\|/g, '/');
}

/**
 * Custom Playwright Reporter that dynamically generates `reports/Automation_Test_Report.md`
 * on every test execution so the Markdown report always reflects actual test outcomes.
 */
class MarkdownReporter {
  onBegin(config, suite) {
    this.startTime = Date.now();
    this.results = [];
  }

  onTestEnd(test, result) {
    const specFile = path.basename(test.location.file);
    const suiteTitle = test.parent ? test.parent.title : '';
    const statusMap = {
      passed: 'PASS',
      failed: 'FAIL',
      timedOut: 'TIMEOUT',
      skipped: 'SKIPPED',
      interrupted: 'INTERRUPTED',
    };

    this.results.push({
      title: test.title,
      suite: suiteTitle,
      specFile,
      durationSec: (result.duration / 1000).toFixed(1) + 's',
      rawStatus: result.status,
      status: statusMap[result.status] || result.status.toUpperCase(),
      error: formatErrorForMarkdown(result.error),
    });
  }

  onEnd(result) {
    const totalDurationSec = ((Date.now() - this.startTime) / 1000).toFixed(1);
    const total = this.results.length;
    const passed = this.results.filter((r) => r.rawStatus === 'passed').length;
    const failed = this.results.filter(
      (r) => r.rawStatus === 'failed' || r.rawStatus === 'timedOut'
    ).length;
    const skipped = this.results.filter((r) => r.rawStatus === 'skipped').length;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(2) : '0.00';

    const apiTests = this.results.filter((r) =>
      r.specFile.includes('petstore.api')
    );
    const uiTests = this.results.filter(
      (r) => !r.specFile.includes('petstore.api')
    );

    const summarizeGroup = (items) => {
      const t = items.length;
      const p = items.filter((r) => r.rawStatus === 'passed').length;
      const f = items.filter(
        (r) => r.rawStatus === 'failed' || r.rawStatus === 'timedOut'
      ).length;
      const s = items.filter((r) => r.rawStatus === 'skipped').length;
      const rate = t > 0 ? ((p / t) * 100).toFixed(0) + '%' : 'N/A';
      return { t, p, f, s, rate };
    };

    const apiSum = summarizeGroup(apiTests);
    const uiSum = summarizeGroup(uiTests);

    const nowStr =
      new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

    let md = `# Task 2 & Task 3 – Playwright Automation Test Report\n\n`;
    md += `> **Auto-Generated Report:** File ini di-generate secara otomatis setiap kali \`npm test\` / \`npx playwright test\` dijalankan.\n\n`;
    md += `**Framework:** Playwright (\`@playwright/test\`)  \n`;
    md += `**Execution Timestamp:** ${nowStr}  \n`;
    md += `**Overall Status:** ${result.status.toUpperCase()}  \n`;
    md += `**Total Duration:** ${totalDurationSec}s  \n\n`;
    md += `---\n\n`;
    md += `## 1. Execution Summary\n\n`;
    md += `| Suite Category | Total Executed | Passed | Failed | Skipped | Pass Rate |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :---: |\n`;
    md += `| **Task 2 – Petstore API Automation** | ${apiSum.t} | ${apiSum.p} | ${apiSum.f} | ${apiSum.s} | **${apiSum.rate}** |\n`;
    md += `| **Task 3 – SauceDemo UI Automation** | ${uiSum.t} | ${uiSum.p} | ${uiSum.f} | ${uiSum.s} | **${uiSum.rate}** |\n`;
    md += `| **TOTAL** | **${total}** | **${passed}** | **${failed}** | **${skipped}** | **${passRate}%** |\n\n`;
    md += `---\n\n`;

    if (apiTests.length > 0) {
      md += `## 2. Task 2 – API Automation Test Results (\`https://petstore.swagger.io/v2\`)\n\n`;
      md += `| Spec File | Test Case | Duration | Status | Error (If Any) |\n`;
      md += `| :--- | :--- | :---: | :---: | :--- |\n`;
      for (const t of apiTests) {
        md += `| \`${t.specFile}\` | ${t.title} | ${t.durationSec} | **${t.status}** | ${
          t.error ? `\`${t.error}\`` : '-'
        } |\n`;
      }
      md += `\n---\n\n`;
    }

    if (uiTests.length > 0) {
      md += `## 3. Task 3 – UI Automation Test Results (\`https://www.saucedemo.com\`)\n\n`;
      md += `| Spec File | Test Case | Duration | Status | Error (If Any) |\n`;
      md += `| :--- | :--- | :---: | :---: | :--- |\n`;
      for (const t of uiTests) {
        md += `| \`${t.specFile}\` | ${t.title} | ${t.durationSec} | **${t.status}** | ${
          t.error ? `\`${t.error}\`` : '-'
        } |\n`;
      }
      md += `\n---\n\n`;
    }

    md += `## 4. Artifacts & Interactive Report\n\n`;
    md += `- **Interactive HTML Report:** [\`reports/html-report/index.html\`](./html-report/index.html) (jalankan \`npm run report\`)\n`;
    md += `- **JSON Report:** [\`reports/test-results.json\`](./test-results.json)\n`;
    md += `- **Screenshots Folder:** [\`screenshots/\`](../screenshots/)\n`;

    const reportsDir = path.resolve(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(reportsDir, 'Automation_Test_Report.md'),
      md,
      'utf8'
    );
  }
}

module.exports = MarkdownReporter;
