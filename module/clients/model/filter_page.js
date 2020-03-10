$(document).ready(function () {

    var url = "module/clients/controller/controller_clients.php?op=datatable";  

    var source =
    {
        dataType: "json",
        dataFields: [
            { name: 'codprod', type: 'string' },
            { name: 'product', type: 'string' },
            { name: 'ingredients', type: 'string' },
            { name: 'flavour', type: 'string' },
            { name: 'brand', type: 'string' },
            { name: 'kg', type: 'integer' },
            { name: 'datecaducity', type: 'string' },
            { name: 'descr', type: 'string' },
            { name: 'price', type: 'string' },
        ],
        id: 'id',
        url: url
    };

    var dataAdapter = new $.jqx.dataAdapter(source);

    $("#list_clients").jqxDataTable(
    {
        width: getWidth("list_clients"),
        pageable: true,
        pagerButtonsCount: 10,
        source: dataAdapter,
        sortable: true,
        pageable: true,
        altRows: true,
        filterable: true,
        columnsResize: true,
        pagerMode: 'advanced',
        columns: [
          { text: 'Code of product', dataField: 'codprod' },
          { text: 'Product', dataField: 'product'},
          { text: 'Ingredients', dataField: 'ingredients' },
          { text: 'Flavour', dataField: 'flavour' },
          { text: 'Brand', dataField: 'brand' },
          { text: 'KG', dataField: 'kg' },
          { text: 'Date of caducity', dataField: 'datecaducity' },
          { text: 'Description', dataField: 'descr' },
          { text: 'Price (€)', dataField: 'price'},
        ]
    });
});
