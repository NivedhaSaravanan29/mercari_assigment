import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

class CustomReporter {
    constructor () {
        this.logFilePath = path.join(process.cwd(), 'test-logs.txt');
        this.htmlReportPath = path.join(process.cwd(), 'playwright-report', 'index.html');
        fs.writeFileSync(this.logFilePath, ''); // Clear previous logs
    }

    // onBegin (suite) {
    //     // Log the start of an individual test
    //     const testMessage = `Starting Test Suite: ${suite.title}\n`;
    //     fs.appendFileSync(this.logFilePath, testMessage);
    //     console.log(chalk.magenta(testMessage));
    // }

    onTestBegin (test) {
        // Log the start of an individual test
        const testMessage = `Preparing to execute: ${test.parent.title}/${test.title}`;
        fs.appendFileSync(this.logFilePath, testMessage);
        console.log(chalk.yellow(testMessage));
    }

    onTestEnd (test, result) {
        const absoluteHtmlReportPath = path.resolve(this.htmlReportPath);
        const fileUrl = `file://${absoluteHtmlReportPath}#?testId=${test.id}`;
        const hyperlink = `\u001b]8;;${fileUrl}\u0007${test.parent.title}/${test.title}\u001b]8;;\u0007`;
        const logMessage = `Test: ${test.id}, Status: ${result.status}, report: ${hyperlink}\n`;
        fs.appendFileSync(this.logFilePath, logMessage);
        if (result.status === 'failed') {
            console.log(`Test Status ${chalk.red(result.status)}`);
            console.log(chalk.blue(`See detailed report: ${hyperlink}\n`));
        } else if (result.status === 'timedOut') {
            console.log(`Test Status ${chalk.red(result.status)}\n`);
        } else {
            console.log(`Test Status ${chalk.greenBright(result.status)}\n`);
        }
    }

    onEnd (result) {
        console.log('**************************************************');
        if (result.status === 'failed') {
            console.log(`Test Status ${chalk.red(result.status)}`);
        } else if (result.status === 'timedOut') {
            console.log(`Test Status ${chalk.red(result.status)}`);
        } else {
            console.log(`Test Status ${chalk.greenBright(result.status)}`);
        }
        console.log(`Total Duration: ${chalk.yellow(result.duration / 60000)}`);
        console.log(`All logs are stored in ${this.logFilePath}`);
        console.log('**************************************************');
    }
}

export default CustomReporter;