module.exports = {
    sheetID: 'xxxxx',
    sheetRange: 'OpenCFPs!A1:T',
    csv: 'OpenCFPs.csv',
    columnsMap: [
        /* My columns:
        Name - Focus - Country - City - CFP Deadline - Conference Start - Language - CFP link - Watchlist - Unsuitable - Submitted - ...on - ...with the talk - ...via - Response - Conference End - Continent - Expenses - Remuneration - Additional Information
        
        Mapping them to the CSV columns: */
        'Name',
        'Focus',
        'Country',
        'City',
        'Submission Deadline',
        'Conference Start',
        'Language',
        'Link to the call for paper',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Conference End',
        'Continent',
        'Expenses',
        'Remuneration',
        'Additional Information'
    ]
}