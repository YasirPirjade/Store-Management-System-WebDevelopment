$(document).ready(() => {

    const renderUsers = (data) => {

        let tableRow = $("<tr>")
        tableRow.addClass('table-row')

        let ID = $("<td>")
        ID.addClass('table-data-row')
        ID.text(data.id)

        let userAvatar = $("<td>")
        userAvatar.addClass('table-data-row')

        let profilePicture = $("<img>")
        profilePicture.addClass('user-avatar')
        profilePicture.attr('src', data.profilePic)
        profilePicture.attr('alt', data.fullName)

        userAvatar.append(profilePicture)

        let fullName = $("<td>")
        fullName.addClass('table-data-row')
        fullName.text(data.fullName)

        let DOB = $("<td>")
        DOB.addClass('table-data-row')
        DOB.text(data.dob)

        let gender = $("<td>")
        gender.addClass('table-data-row')
        gender.text(data.gender)

        let currentLocation = $("<td>")
        currentLocation.addClass('table-data-row')
        currentLocation.text(data.currentCity + ', ' + data.currentCountry)

        tableRow.append(ID, userAvatar, fullName, DOB, gender, currentLocation)

        return tableRow

    }

    let userData

    let searchField = $('#search-field')

    $('#search-reset-btn').on({
        'click' : (e) => {
            let table = $('#users-table')
            table.empty()
            table.append('<tr id="table-heading-row">\n' +
                '                <th class="table-headings">ID</th>\n' +
                '                <th class="table-headings">User Avatar</th>\n' +
                '                <th class="table-headings">Full Name</th>\n' +
                '                <th class="table-headings">DoB</th>\n' +
                '                <th class="table-headings">Gender</th>\n' +
                '                <th class="table-headings">Current Location</th>\n' +
                '            </tr>')
            searchField.val('')
            userData.map((item) => table.append(renderUsers(item)))
        }
    })

    $('#search-field').on({
        'input' : (e) => {

            let table = $('#users-table')

            let toBeRenderedArray = []

            toBeRenderedArray = userData.filter((item) => {
                if(item.fullName.includes(e.target.value)) {
                    return item
                }
            }, e.target.value)

            table.empty()

            table.append('<tr id="table-heading-row">\n' +
                '                <th class="table-headings">ID</th>\n' +
                '                <th class="table-headings">User Avatar</th>\n' +
                '                <th class="table-headings">Full Name</th>\n' +
                '                <th class="table-headings">DoB</th>\n' +
                '                <th class="table-headings">Gender</th>\n' +
                '                <th class="table-headings">Current Location</th>\n' +
                '            </tr>')

            toBeRenderedArray.map((item) => table.append(renderUsers(item)))

        }
    })

    $.get('https://5f01721007605200169e6fd4.mockapi.io/kafene-project-user-listing', (response) => {
        let table = $('#users-table')

        table.append('<tr id="table-heading-row">\n' +
            '                <th class="table-headings">ID</th>\n' +
            '                <th class="table-headings">User Avatar</th>\n' +
            '                <th class="table-headings">Full Name</th>\n' +
            '                <th class="table-headings">DoB</th>\n' +
            '                <th class="table-headings">Gender</th>\n' +
            '                <th class="table-headings">Current Location</th>\n' +
            '            </tr>')

        userData = response

        response.map((item) => table.append(renderUsers(item)))
    })

})