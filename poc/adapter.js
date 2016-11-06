const PATH = require('path');
const FS = require('fs');

const http2 = require('http2');
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');

const app = express();
const PORT = 4001;

const CHART = FS.readFileSync(PATH.resolve(__dirname, './files/chart.html'), 'utf-8');
const MAIN_LAYOUT = FS.readFileSync(PATH.resolve(__dirname, './files/main-layout.html'), 'utf-8');
const PAGE_LAYOUT = FS.readFileSync(PATH.resolve(__dirname, './files/page-layout.html'), 'utf-8');

const REFS = {
  "54bf9b5e636d735fe10e0000": {
    "id": "54bf9b5e636d735fe10e0000",
    "component": "MasterLayout",
    "belongsTo": "__body",
    "layout": null,
    "token": null,
    "render": MAIN_LAYOUT
  },
  "54c8c2fe636d736595030100": {
    "id": "54c8c2fe636d736595030100",
    "component": "PageLayout",
    "belongsTo": "PageContainer-54bf9b5e636d735fe1390000",
    "layout": "MasterLayout",
    "token": "page_layout",
    "render": PAGE_LAYOUT
  },
  "54c8c2fe636d736595110100": {
    "id": "54c8c2fe636d736595110100",
    "component": "TitleComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595120100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595120100",
    "render": "<h3>54c8c2fe636d736595110100</h3>"
  },
  "54c8c2fe636d736595140100": {
    "id": "54c8c2fe636d736595140100",
    "component": "WysiwygComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595150100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595150100",
    "render": "<h3>54c8c2fe636d736595140100</h3>"
  },
  "5614ebd9636d735640310900": {
    "id": "5614ebd9636d735640310900",
    "component": "PageStyleComponent",
    "belongsTo": "StyleContainer-5614ebd9636d735640300900",
    "layout": "PageLayout",
    "token": "5614ebd9636d735640300900",
    "render": "<h3>5614ebd9636d735640310900</h3>"
  },
  "54c8c2fe636d7365951d0100": {
    "id": "54c8c2fe636d7365951d0100",
    "component": "ChartComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d7365951e0100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d7365951e0100",
    "render": "<h3>54c8c2fe636d7365951d0100</h3>"
  },
  "54c8c2fe636d7365951f0100": {
    "id": "54c8c2fe636d7365951f0100",
    "component": "WidgetsComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595200100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595200100",
    "render": "<h3>54c8c2fe636d7365951f0100</h3>"
  },
  "54c8c2fe636d736595220100": {
    "id": "54c8c2fe636d736595220100",
    "component": "WidgetsComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595230100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595230100",
    "render": "<h3>54c8c2fe636d736595220100</h3>"
  },
  "54c8c2fe636d736595240100": {
    "id": "54c8c2fe636d736595240100",
    "component": "WidgetsComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595250100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595250100",
    "render": "<h3>54c8c2fe636d736595240100</h3>"
  },
  "54c8c2fe636d736595260100": {
    "id": "54c8c2fe636d736595260100",
    "component": "WysiwygComponent",
    "belongsTo": "SingleContainer-54c8c2fe636d736595270100",
    "layout": "PageLayout",
    "token": "54c8c2fe636d736595270100",
    "render": "<h3>54c8c2fe636d736595260100</h3>"
  },
  "54cde4c6636d733ed6940000": {
    "id": "54cde4c6636d733ed6940000",
    "component": "WidgetsComponent",
    "belongsTo": "SingleContainer-54cde4c6636d733ed6950000",
    "layout": "PageLayout",
    "token": "54cde4c6636d733ed6950000",
    "render": "<h3>54cde4c6636d733ed6940000</h3>"
  },
  "54bf9b5e636d735fe1240000": {
    "id": "54bf9b5e636d735fe1240000",
    "component": "SiteLogoComponent",
    "belongsTo": "SingleContainer-54bf9b5e636d735fe1250000",
    "layout": "MasterLayout",
    "token": "54bf9b5e636d735fe1250000",
    "render": "<h3>54bf9b5e636d735fe1240000</h3>"
  },
  "54bf9b5e636d735fe1270000": {
    "id": "54bf9b5e636d735fe1270000",
    "component": "LinkListComponent",
    "belongsTo": "SingleContainer-54bf9b5e636d735fe1280000",
    "layout": "MasterLayout",
    "token": "54bf9b5e636d735fe1280000",
    "render": "<h3>54bf9b5e636d735fe1270000</h3>"
  },
  "54bf9b5e636d735fe12e0000": {
    "id": "54bf9b5e636d735fe12e0000",
    "component": "WysiwygComponent",
    "belongsTo": "SingleContainer-54bf9b5e636d735fe12f0000",
    "layout": "MasterLayout",
    "token": "54bf9b5e636d735fe12f0000",
    "render": "<h3>54bf9b5e636d735fe12e0000</h3>"
  },
  "54bf9b5e636d735fe1300000": {
    "id": "54bf9b5e636d735fe1300000",
    "component": "FooterLinkListComponent",
    "belongsTo": "SingleContainer-54bf9b5e636d735fe1310000",
    "layout": "MasterLayout",
    "token": "54bf9b5e636d735fe1310000",
    "render": "<h3>54bf9b5e636d735fe1300000</h3>"
  },
  "55c9e81f636d731dd02a1b00": {
    "id": "55c9e81f636d731dd02a1b00",
    "component": "JsInjectorComponent",
    "belongsTo": "SingleContainer-55c9e81f636d731dd0291b00",
    "layout": "MasterLayout",
    "token": "55c9e81f636d731dd0291b00",
    "render": "<h3>55c9e81f636d731dd02a1b00</h3>"
  },
  "55eff848636d734306080000": {
    "id": "55eff848636d734306080000",
    "component": "JsInjectorComponent",
    "belongsTo": "SingleContainer-55eff848636d734306070000",
    "layout": "MasterLayout",
    "token": "55eff848636d734306070000",
    "render": "<h3>55eff848636d734306080000</h3>"
  },
  "56a70f597858775d4800001b": {
    "id": "56a70f597858775d4800001b",
    "component": "JsInjectorComponent",
    "belongsTo": "SingleContainer-56a70f597858775d4800001a",
    "layout": "MasterLayout",
    "token": "56a70f597858775d4800001a",
    "render": "<h3>56a70f597858775d4800001b</h3>"
  },
  "57147a647858772adc000049": {
    "id": "57147a647858772adc000049",
    "component": "JsInjectorComponent",
    "belongsTo": "SingleContainer-57147a647858772adc000048",
    "layout": "MasterLayout",
    "token": "57147a647858772adc000048",
    "render": "<h3>57147a647858772adc000049</h3>"
  }
};

app.use(morgan('dev'));
app.use(compression());

app.get('/api/render/:type/:id/*', (req, res) => {
    const {id} = req.params;
    const random = Math.random(0, 1);

    if (random > 0.1) {
        res.status(200).send({[id]: REFS[id]});
    } else {
        res.status(500).send();
    }
});

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Listening on ${PORT}`);
    } else {
        console.log(err);
    }
});

// http2.createServer({
//     key: FS.readFileSync(PATH.resolve(__dirname, './key.pem')),
//     cert: FS.readFileSync(PATH.resolve(__dirname, './cert.pem'))
// }, app).listen(PORT, (err) => {
//     if (!err) {
//         console.log(`Listening on ${PORT}`);
//     } else {
//         console.log(err);
//     }
// });
