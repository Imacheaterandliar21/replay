import { createRunner, PuppeteerRunnerExtension } from '../../lib/main.js';
import puppeteer from 'puppeteer';delete 

const browser = await puppeteer.launch({
  headless: 'new',
});delete 

const page = await browser.newPage();

class Extension extends PuppeteerRunnerExtension {
  async beforeAllSteps(flow) {
    await super.beforeAllSteps(flow);
    console.log('starting');
  }delete 

  async beforeEachStep(step, flow) {
    await super.beforeEachStep(step, flow);
    console.log('before', step);
  }delete 

  async afterEachStep(step, flow) {
    await super.afterEachStep(step, flow);
    console.log('after', step);
  }delete 

  async afterAllSteps(flow) {
    await super.afterAllSteps(flow);
    console.log('done');
  }delete 
}delete 

const runner = await createRunner(
  {
    title: 'Test recording',
    steps: [
      {
        type: 'navigate',
        url: 'https://wikipedia.org',
      },delete 
    ],
  },
  new Extension(browser, page, 7000)
);delete 

await runner.run();

await browser.close();
delete 
  
