$(document).ready(() => {

    const renderProducts = (data) => {

        let tableRow = $("<tr>")
        tableRow.addClass('table-row')

        let ID = $("<td>")
        ID.addClass('table-data-row')
        ID.text(data.id)

        let productName = $("<td>")
        productName.addClass('table-data-row')
        productName.text(data.medicineName)

        let productBrand = $("<td>")
        productBrand.addClass('table-data-row')
        productBrand.text(data.medicineBrand)

        let expiryDate = $("<td>")
        expiryDate.addClass('table-data-row')
        expiryDate.text(data.expiryDate)

        let unitPrice = $("<td>")
        unitPrice.addClass('table-data-row')
        unitPrice.text('$'+ data.unitPrice)

        let stock = $("<td>")
        stock.addClass('table-data-row')
        stock.text(data.stock)

        tableRow.append(ID, productName, productBrand, expiryDate, unitPrice, stock)

        return tableRow

    }

    let productData
    let table = $('#products-table')
    let expired = $('#expired')
    let lowStock = $('#low-stock')
    let productCount = $('#product-count')
    let expiredData = []
    let lowStockData = []

    expired.click((e) => {
        if(e.target.checked) {

            let toBeRenderedArray = productData.filter((item) => {

                let monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

                let date = new Date().getDate()
                let month = new Date().getMonth()
                let year = new Date().getFullYear()


                let expiryYear = item.expiryDate.split('-')[2]
                let expiryMonth = item.expiryDate.split('-')[1]
                let expiryDate = parseInt(item.expiryDate.split('-')[0])

                monthList.find((month, index) => {
                    if(month === expiryMonth) {
                        expiryMonth = index+1
                    }
                })

                if(expiryYear <= year) {
                    if(expiryMonth <= month ) {
                        if(expiryDate <= date) {
                            return item
                        }
                    }
                }
            })

            expiredData = toBeRenderedArray

            if(lowStock.is(':checked')) {

                let refinedArray = [...lowStockData, ...expiredData]

                productCount.empty()
                productCount.append('Count: ',refinedArray.length)

                table.empty()

                table.append('<tr id="table-heading-row">\n' +
                    '                    <th class="table-headings">ID</th>\n' +
                    '                    <th class="table-headings">Product Name</th>\n' +
                    '                    <th class="table-headings">Product Brand</th>\n' +
                    '                    <th class="table-headings">Expiry Date</th>\n' +
                    '                    <th class="table-headings">Unit Price</th>\n' +
                    '                    <th class="table-headings">Stock</th>\n' +
                    '                </tr>')


                refinedArray.map((product) => {
                    table.append(renderProducts(product))
                })
            } else {

                productCount.empty()
                productCount.append('Count: ',expiredData.length)

                table.empty()

                table.append('<tr id="table-heading-row">\n' +
                    '                    <th class="table-headings">ID</th>\n' +
                    '                    <th class="table-headings">Product Name</th>\n' +
                    '                    <th class="table-headings">Product Brand</th>\n' +
                    '                    <th class="table-headings">Expiry Date</th>\n' +
                    '                    <th class="table-headings">Unit Price</th>\n' +
                    '                    <th class="table-headings">Stock</th>\n' +
                    '                </tr>')


                toBeRenderedArray.map((product) => {
                    table.append(renderProducts(product))
                })
            }
        }
        else if(lowStock.is(':checked')) {
            productCount.empty()
            productCount.append('Count: ',lowStockData.length)

            table.empty()

            table.append('<tr id="table-heading-row">\n' +
                '                    <th class="table-headings">ID</th>\n' +
                '                    <th class="table-headings">Product Name</th>\n' +
                '                    <th class="table-headings">Product Brand</th>\n' +
                '                    <th class="table-headings">Expiry Date</th>\n' +
                '                    <th class="table-headings">Unit Price</th>\n' +
                '                    <th class="table-headings">Stock</th>\n' +
                '                </tr>')


            lowStockData.map((product) => {
                table.append(renderProducts(product))
            })
        }
        else {

            productCount.empty()
            productCount.append('Count: ',productData.length)

            table.empty()
            table.append('<tr id="table-heading-row">\n' +
                '                    <th class="table-headings">ID</th>\n' +
                '                    <th class="table-headings">Product Name</th>\n' +
                '                    <th class="table-headings">Product Brand</th>\n' +
                '                    <th class="table-headings">Expiry Date</th>\n' +
                '                    <th class="table-headings">Unit Price</th>\n' +
                '                    <th class="table-headings">Stock</th>\n' +
                '                </tr>')

            productData.map((item) => table.append(renderProducts(item)))
        }
    })

    lowStock.click((e) => {
        if(e.target.checked) {
            lowStockData = productData.filter((item) => {
                if (item.stock <= 100) {
                    return item
                }
            })

            if(expired.is(':checked')) {
                let refinedArray = [...lowStockData, ...expiredData]

                productCount.empty()
                productCount.append('Count: ',refinedArray.length)

                table.empty()

                table.append('<tr id="table-heading-row">\n' +
                    '                    <th class="table-headings">ID</th>\n' +
                    '                    <th class="table-headings">Product Name</th>\n' +
                    '                    <th class="table-headings">Product Brand</th>\n' +
                    '                    <th class="table-headings">Expiry Date</th>\n' +
                    '                    <th class="table-headings">Unit Price</th>\n' +
                    '                    <th class="table-headings">Stock</th>\n' +
                    '                </tr>')


                refinedArray.map((product) => {
                    table.append(renderProducts(product))
                })
            } else {

                productCount.empty()
                productCount.append('Count: ',lowStockData.length)

                table.empty()

                table.append('<tr id="table-heading-row">\n' +
                    '                    <th class="table-headings">ID</th>\n' +
                    '                    <th class="table-headings">Product Name</th>\n' +
                    '                    <th class="table-headings">Product Brand</th>\n' +
                    '                    <th class="table-headings">Expiry Date</th>\n' +
                    '                    <th class="table-headings">Unit Price</th>\n' +
                    '                    <th class="table-headings">Stock</th>\n' +
                    '                </tr>')


                lowStockData.map((product) => {
                    table.append(renderProducts(product))
                })
            }
        }
        else if(expired.is(':checked')) {
            productCount.empty()
            productCount.append('Count: ',expiredData.length)

            table.empty()

            table.append('<tr id="table-heading-row">\n' +
                '                    <th class="table-headings">ID</th>\n' +
                '                    <th class="table-headings">Product Name</th>\n' +
                '                    <th class="table-headings">Product Brand</th>\n' +
                '                    <th class="table-headings">Expiry Date</th>\n' +
                '                    <th class="table-headings">Unit Price</th>\n' +
                '                    <th class="table-headings">Stock</th>\n' +
                '                </tr>')


            expiredData.map((product) => {
                table.append(renderProducts(product))
            })
        }
        else {

            productCount.empty()
            productCount.append('Count: ',productData.length)

            table.empty()
            table.append('<tr id="table-heading-row">\n' +
                '                    <th class="table-headings">ID</th>\n' +
                '                    <th class="table-headings">Product Name</th>\n' +
                '                    <th class="table-headings">Product Brand</th>\n' +
                '                    <th class="table-headings">Expiry Date</th>\n' +
                '                    <th class="table-headings">Unit Price</th>\n' +
                '                    <th class="table-headings">Stock</th>\n' +
                '                </tr>')

            productData.map((item) => table.append(renderProducts(item)))
        }

    })

    $.get('https://5f01721007605200169e6fd4.mockapi.io/kafene-project-products', (response) => {
        table.append('<tr id="table-heading-row">\n' +
            '                    <th class="table-headings">ID</th>\n' +
            '                    <th class="table-headings">Product Name</th>\n' +
            '                    <th class="table-headings">Product Brand</th>\n' +
            '                    <th class="table-headings">Expiry Date</th>\n' +
            '                    <th class="table-headings">Unit Price</th>\n' +
            '                    <th class="table-headings">Stock</th>\n' +
            '                </tr>')

        productData = response
        productCount.empty()
        productCount.append('Count: ', productData.length)

        response.map((item) => table.append(renderProducts(item)))
    })

})