import { chromium } from 'playwright';

// generar resultados

async function getResultFromGoogle(query, city) {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('https://www.buscadordeempleo.gov.co/#/home');
        await page.waitForSelector('input[name="search-job-input"]');
        await page.type('input[name="search-job-input"]', query);
        await page.keyboard.press('Enter');
        console.log('He llegado hasta enter');
        await page.waitForSelector('div[class="results-card-container"]');
        console.log('He llegado más abajo');

        if (city != null) {
            await page.click(`div.municipality-card-container p:has-text("${city}")`);
            await page.waitForTimeout(2000); // Espera para que se actualicen los resultados
            const listadoResultados = await page.evaluate(() => {
                let resultados = [];
                console.log('Entramos a lista de resultado');
                document.querySelectorAll('div[class="results-card-container"]').forEach((anchor, index) => {
                    lista = anchor.querySelector('div[class="results-card-secondary-info"]').innerText;
                    divide = lista.split('\n');
                    resultados.push({
                        index: index,
                        title: divide[0],
                        content: divide[divide.length - 1],
                        url: anchor.querySelector('a').href,
                    });
                });
                return resultados;
            });
    
            console.log(listadoResultados);
            await browser.close();
            return listadoResultados;
        }
        else{
            const listadoResultados = await page.evaluate(() => {
                let resultados = [];
                console.log('Entramos a lista de resultado');
                document.querySelectorAll('div[class="results-card-container"]').forEach((anchor, index) => {
                    lista = anchor.querySelector('div[class="results-card-secondary-info"]').innerText;
                    divide = lista.split('\n');
                    resultados.push({
                        index: index,
                        title: divide[0],
                        content: divide[divide.length - 1],
                        url: anchor.querySelector('a').href,
                    });
                });
                return resultados;
            });
    
            console.log(listadoResultados);
            await browser.close();
            return listadoResultados;
        }

        
    } catch (error) {
        console.error('Ha ocurrido un error:', error);
    }
}

async function getResultFromGoogle1(query)
{
    try
    {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('https://agenciapublicadeempleo.sena.edu.co/spe-web/spe/public/buscadorVacante?solicitudId=mecanico');
        console.log('he llegado hasta enter pagina')
        try {
            await page.waitForSelector('input[name="solicitudId"]'); // Esperar hasta 5 segundos
        } catch (error) {
            console.log('El input no apareció a tiempo');
            await browser.close();
            return [];
        }
        console.log('he llegado hasta enter pagina1')
        await page.type('input[name="solicitudId"]',query);
        page.keyboard.press('Enter');
        console.log('he llegado hasta enter')
        try {
            await page.waitForSelector('div[class="dataTables_wrapper no-footer"]') // Esperar hasta 5 segundos
        } catch (error) {
            console.log('La busqueda no aparecio');
            await browser.close();
            return [];
        }
        
        //await page.waitForNavigation({waitUntil: 'networkidle'});
        console.log('he llegado mas abajo')
        await page.type('select[name="buscar-solicitud-public_length"]', '100');
        
        const listadoResultados = await page.evaluate(()=> {
            let resultados = [];
            console.log('entramos a lista de resultado')
            document.querySelectorAll('div[class="row"] ').forEach((anchor, index)=>{
                lista = anchor.querySelector('div[class="span5"]').innerText
                divide = lista.split('\n');
                par = divide.slice(1).join('\n');
                        resultados.push({
                            index: index,
                            title: divide[0],
                            content: par,
                            url: anchor.querySelector('div[class="span1"] a').href,
                        });
            });
            return resultados;
        });

        console.log(listadoResultados);
        await browser.close();
        return listadoResultados;
    }
    catch(error)
    {
        console.log(error);
        res.status(450).json('pagina caida', error);
        return []
    }
    

}

const buscar = async (req, res, next) => {
  const { search } = req.body;

  try {
    
    const resultado0 = await getResultFromGoogle(search, null);
    const resultado1 = await getResultFromGoogle1(search);
    const resultado = resultado0.concat(resultado1);

      
    // Enviar respuesta con el token
    res.status(200).json({ respuesta: 'ok', resultados: resultado });
  } catch (error) {
    console.log(error);
    res.status(500).json('Error interno del servidor1', error);
  }
};




export { buscar }
