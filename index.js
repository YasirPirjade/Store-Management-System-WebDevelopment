$(document).ready(() => {

    $('.menu-items').click((e) => {

        e.preventDefault()

        if(!loginStatus) {
            location.assign('./index.html')
        }
    })



    $('#login-btn').click((e) => {
        e.preventDefault()

        let username = $('#login-name').val()
        let password = $('#login-password').val()

        let userDetails = JSON.parse(localStorage.getItem('user-details'))

        if(userDetails == null && userDetails == undefined) {
            alert('Invalid Credentials')
        }
        else if(userDetails.name == username && userDetails.password == password) {
            alert('Login Successful!')
            let logoutBtn = $('.menu-items')

            console.log(logoutBtn)
            logoutBtn.addClass('loggedIn').removeClass('loggedOut')

            location.assign('./orders.html')
        }

    })

    $('#sign-up').click((e) => {
        let loginForm = $('#login-form')
        loginForm.addClass('inactive-form')
        loginForm.removeClass('active-form')

        let signUpForm = $('#sign-up-form')
        signUpForm.addClass('active-form')
        signUpForm.removeClass('inactive-form')

        let formHeading = $('#form-heading')
        formHeading.text('Sign Up')
    })

    $('#sign-up-btn').click((e) => {
        e.preventDefault()

        mObj = {
            name: $('#sign-up-name').val(),
            password: $('#sign-up-password').val()
        }

        if(mObj.name != mObj.password) {
            alert('PLease enter correct Credentials to Sign up!')
        } else {
            localStorage.setItem('user-details', JSON.stringify(mObj))

            let loginForm = $('#login-form')
            loginForm.addClass('active-form')
            loginForm.removeClass('inactive-form')

            let signUpForm = $('#sign-up-form')
            signUpForm.addClass('inactive-form')
            signUpForm.removeClass('active-form')

            let formHeading = $('#form-heading')
            formHeading.text('Sign Ip')

            location.assign('./index.html')
        }
    })
})
