import {chromium} from 'playwright';

// generar resultados

async function getResultFromGoogle(query)
{
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
}