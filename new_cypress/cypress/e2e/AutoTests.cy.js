import * as correct from "../helpers/Correct.json"
import * as glavnaya from "../locators/glavnaya.json"
import * as resultat from "../locators/resultat.json"
import * as recovery from "../locators/recovery.json"


describe('Проверка по чек листу', function () {

    beforeEach('Начало', function () {
        cy.visit('/');  // Зайти на сайт
        cy.get(glavnaya.recovery).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверка цвета кнопки забыли пароль
        cy.get(glavnaya.zagolovok).contains('Форма логина'); // Проверка текста на начальной старнице
        });

    afterEach('Конец', function () {
        cy.get(resultat.krestik).should('be.visible');
        cy.get(resultat.link).contains('qa.studio') // Надпись линки qa.studio
        });

    it('Проверка авторизации положительно', function () {
         cy.get(glavnaya.login).type(correct.login); // Ввести правильный логин
         cy.get(glavnaya.password).type(correct.password); // Ввести правильный пароль
         cy.get(glavnaya.enter).click(); // Нажать кнопку войти

         cy.get(resultat.otvet).contains('Авторизация прошла успешно'); // Проверка текста входа
    })

    it('Восстановления пароля', function () {
        cy.get(glavnaya.recovery).click(); // Нажать кнопку забыли пароль
        cy.get(recovery.login).type(correct.login); // Ввести почту для восстановления пароля
        cy.get(recovery.recovery).click(); // нажать кнопку отправить код

        cy.get(resultat.otvet).contains('Успешно отправили пароль на e-mail'); // Проверка текста восстановления
    })

    it('Проверка авторизации негативно пароль', function () {
        cy.get(glavnaya.login).type(correct.login); // Ввести правильный логин
        cy.get(glavnaya.password).type('iLoveqastudio'); // Ввести неправильный пароль
        cy.get(glavnaya.enter).click(); // Нажать кнопку войти

        cy.get(resultat.otvet).contains('Такого логина или пароля нет'); // Проверка текста входа
    })

    it('Проверка авторизации негативно логин', function () {
        cy.get(glavnaya.login).type('g4rman1@dolnikov.ru'); // Ввести неправильный логин
        cy.get(glavnaya.password).type(correct.password); // Ввести правильный пароль
        cy.get(glavnaya.enter).click(); // Нажать кнопку войти

        cy.get(resultat.otvet).contains('Такого логина или пароля нет'); // Проверка текста входа
    })
    
    it('Проверка логин без @', function () {
        cy.get(glavnaya.login).type('germandolnikov.ru'); // Ввести правильный логин без @
        cy.get(glavnaya.password).type(correct.password); // Ввести правильный пароль
        cy.get(glavnaya.enter).click(); // Нажать кнопку войти

        cy.get(resultat.otvet).contains('Нужно исправить проблему валидации'); // Проверка текста входа
    })

    it('Проверка логин на строчные буквы', function () {
        cy.get(glavnaya.login).type('GerMan@Dolnikov.ru'); // Ввести правильный логин
        cy.get(glavnaya.password).type(correct.password); // Ввести правильный пароль
        cy.get(glavnaya.enter).click(); // Нажать кнопку войти

        cy.get(resultat.otvet).contains('Авторизация прошла успешно'); // Проверка текста входа
    })
 }) 