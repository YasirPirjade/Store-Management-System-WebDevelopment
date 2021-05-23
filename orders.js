$(document).ready(() => {

    const renderOrders = (data) => {

        let tableRow = $("<tr>")
        tableRow.addClass('table-row')

        let ID = $("<td>")
        ID.addClass('table-data-row')
        ID.text(data.id)

        let customerName = $("<td>")
        customerName.addClass('table-data-row')
        customerName.text(data.customerName)


        let orderDate = $("<td>")
        orderDate.addClass('table-data-row')
        orderDate.text(data.orderDate)

        let amount = $("<td>")
        amount.addClass('table-data-row')
        amount.text(data.amount)

        let orderStatus = $("<td>")
        orderStatus.addClass('table-data-row')
        orderStatus.text(data.orderStatus)

        tableRow.append(ID, customerName, orderDate, amount, orderStatus)

        return tableRow

    }

    let ordersData
    let newOrders
    let packedOrders
    let intransitOrders
    let deliveredOrders
    let newCheckbox = $('#new')
    let packedCheckbox = $('#packed')
    let intransitCheckbox = $('#intransit')
    let deliveredCheckbox = $('#delivered')
    let selected = []

    $('input:checkbox').change((e) => {

        let table = $('#orders-table')
        let ordersCount = $('#order-count')

        let refinedArray = []
        if(e.target.checked) {
            selected.push(e.target.value)
            selected.map((item, index) => {
                refinedArray.push(...eval(`${item}Orders`))
            })
        } else {
            let index = selected.indexOf(e.target.value)
            selected.splice(index, 1)
            selected.map((item, index) => {
                let value = e.target.labels[0].outerText.toLowerCase()
                refinedArray.push(...eval(`${value}Orders`))
            })
        }

        ordersCount.empty()
        ordersCount.append('Count: ', refinedArray.length)
        table.empty()

        table.append('<tr id="table-heading-row">\n' +
            '                    <th class="table-headings">ID</th>\n' +
            '                    <th class="table-headings">Customer</th>\n' +
            '                    <th class="table-headings">Date</th>\n' +
            '                    <th class="table-headings">Amount</th>\n' +
            '                    <th class="table-headings">Status</th>\n' +
            '                </tr>')

        refinedArray.map(item => table.append(renderOrders(item)))
    })


    $.get('https://5f01721007605200169e6fd4.mockapi.io/kafene-project-orders', (response) => {

        ordersData = response

        newOrders = ordersData.filter((item) => item.orderStatus == 'New')

        packedOrders = ordersData.filter((item) => item.orderStatus == 'Packed')

        intransitOrders = ordersData.filter((item) => item.orderStatus == 'InTransit')

        deliveredOrders = ordersData.filter((item) => item.orderStatus == 'Delivered')

        newCheckbox.click()
        packedCheckbox.click()
        intransitCheckbox.click()
        deliveredCheckbox.click()

    })


})