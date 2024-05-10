describe('e2e pokemon', function () {
    it('проверка покупки', function () {
        cy.visit('https://pokemonbattle.me/login'); // Заходим на сайт покемонов
        cy.get(':nth-child(1) > .auth__input').type('USER_LOGIN'); // Вводим логин
        cy.get('#password').type('USER_PASSWORD'); // Вводим пароль
        cy.get('.auth__button').click(); // Нажимаем войти
        cy.get('.header__btns > [href="/shop"]').click(); // Заходим в магазин
        cy.get('.available > .shop__button').first().click(); // Выбираем доступный для покупки аватар
        cy.get('.pay__payform-v2 > :nth-child(2) > .pay_base-input-v2').type('4111111111111111'); // Ввод номера карты
        cy.get(':nth-child(1) > .pay_base-input-v2').type('12/24'); // Ввод срока карты
        cy.get('.pay-inputs-box > :nth-child(2) > .pay_base-input-v2').type('125'); // Ввод CVC
        cy.get('.pay__input-box-last-of > .pay_base-input-v2').type('Zbigniew Onwubiko'); // Ввод имени держателя карты
        cy.get('.pay-btn').click(); // Нажимаем оплатить
        cy.get('#cardnumber').type('56456'); // Ввод кода подтверждения
        cy.get('.payment__submit-button').click(); // Нажать отправить
        cy.get('.payment__font-for-success').contains('текПокупка прошла успешност'); // Проверка успешной оплаты
    })
 }) 