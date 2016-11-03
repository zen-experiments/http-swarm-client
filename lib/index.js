const prepare = require('./prepare');
const handle = require('./handle');

const urls = [
    "ml~pl~fll/54bf9b5e636d735fe10e0000~54c8c2fe636d736595030100~54bf9b5e636d735fe1300000/5~6~9/1~1~1/rdb/64/EN/0/www.top10antivirussoftware.com/3/579f511dd45f9e239600418f~2~cs~-564~19928~cl~Default~-552~22147~cl~Default~-561~17558~cl~Default~-562~18304~cl~Default~-57022d024417244b350011d6~4~cc~-54c8d9f4636d735fedb00000~8~cc~-552~1~mp~-564~2~mp~-562~3~mp~-561~4~mp/333/'331'/169~65~170/1",
    "t~w~ps~wc~wc~wc~w~wc/54c8c2fe636d736595110100~54c8c2fe636d736595140100~5614ebd9636d735640310900~54c8c2fe636d7365951f0100~54c8c2fe636d736595220100~54c8c2fe636d736595240100~54c8c2fe636d736595260100~54cde4c6636d733ed6940000/18~11~3~5~15~6~9~4/1~1~1~1~2~1~1~1/rdb/64/EN/0/www.top10antivirussoftware.com/8/579f511dd45f9e239600418f~2~cs~-564~19928~cl~Default~-552~22147~cl~Default~-561~17558~cl~Default~-562~18304~cl~Default~-57022d024417244b350011d6~4~cc~-54c8d9f4636d735fedb00000~8~cc~-552~1~mp~-564~2~mp~-562~3~mp~-561~4~mp/333/'331'/72~69~61~65~67~65~65~65/1",
    "sl~ll~w/54bf9b5e636d735fe1240000~54bf9b5e636d735fe1270000~54bf9b5e636d735fe12e0000/15~22~12/1~1~4/rdb/64/EN/0/www.top10antivirussoftware.com/3/579f511dd45f9e239600418f~2~cs~-564~19928~cl~Default~-552~22147~cl~Default~-561~17558~cl~Default~-562~18304~cl~Default~-57022d024417244b350011d6~4~cc~-54c8d9f4636d735fedb00000~8~cc~-552~1~mp~-564~2~mp~-562~3~mp~-561~4~mp/333/'331'/178~178~172/1",
    "c/54c8c2fe636d7365951d0100/124/13/rdb/64/EN/0/www.top10antivirussoftware.com/1/579f511dd45f9e239600418f~2~cs~-564~19928~cl~Default~-552~22147~cl~Default~-561~17558~cl~Default~-562~18304~cl~Default~-57022d024417244b350011d6~4~cc~-54c8d9f4636d735fedb00000~8~cc~-552~1~mp~-564~2~mp~-562~3~mp~-561~4~mp/333/'331'/208/1",
    "jsi~jsi~jsi~jsi/55c9e81f636d731dd02a1b00~55eff848636d734306080000~56a70f597858775d4800001b~57147a647858772adc000049/16~7~21~1/1~1~1~1/rdb/64/EN/0/www.top10antivirussoftware.com/4/579f511dd45f9e239600418f~2~cs~-564~19928~cl~Default~-552~22147~cl~Default~-561~17558~cl~Default~-562~18304~cl~Default~-57022d024417244b350011d6~4~cc~-54c8d9f4636d735fedb00000~8~cc~-552~1~mp~-564~2~mp~-562~3~mp~-561~4~mp/333/'331'/173~173~135~94/1"
];

const options = {
    baseUrl: 'http://localhost:4000'
};

process.start = process.hrtime();

handle(prepare(urls, options));
