import users from '../fixtures/users.json'
import loginPage from '../support/pages/LoginPage'
import studentPage from '../support/pages/StudentPage'

describe('login', () => {

    it('deve logar com o perfil do admin', () => {

        //Dado que eu tenho o usuário admin cadastrado
        // const user = {
        //     name: 'Admin'
        //     email: 'admin@healthxp.com',
        //     password: 'xperience'
        // }


        //Quando faço login no gestor de academias

        //forma de usar fixtures, com o teste dentro da função de fixture
        //cy.fixture('users.json').then(function (user) {
        //    cy.log(JSON.stringify(user))
        //    cy.visit('http://localhost:3000')
        //    cy.get('input[name=email]').type(user.email)
        //    cy.get('input[name=password]').type(user.password)
        //    cy.contains('button', 'Entrar').click()

        //Então devo ver o dashboard
        //    cy.contains('aside .logged-user', 'Olá, Admin')
        //        .should('be.visible')
        //})

        const user = users.admin
        loginPage.doLogin(user)
        studentPage.navbar.userLoggedIn(user.name)
        
    })

    it('não deve logar com senha incorreta', () => {
        const user = users.inv_pass
        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com email não cadastrado', () => {
        const user = users.email_not_found
        loginPage.doLogin(user)
        loginPage.popup.haveText('Suas credenciais são inválidas, por favor tente novamente!')

    })

    it('não deve logar com emails incorretos', () => {
        const emails = users.inv_emails

        let outputMessages = []
        let expectedMessages = []

        loginPage.go()

        emails.forEach((u) => {
            loginPage.fill(u)
            loginPage.submit()

            loginPage.popup.content()
                .invoke('text')
                .then((t)=> {
                    cy.log(t)
                    outputMessages.push(t)
                    expectedMessages.push('Insira um email válido.')
                })
                loginPage.popup.back()
        })

        cy.wrap(outputMessages).should('deep.equal', expectedMessages)

    })

    it('não deve logar com email em branco', () => {
        const user = users.empty_email
        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })

    it('não deve logar com senha em branco', () => {
        const user = users.empty_password
        loginPage.doLogin(user)
        loginPage.popup.haveText('Os campos email e senha são obrigatórios.')

    })
})
