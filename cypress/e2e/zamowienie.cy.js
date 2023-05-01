context('Zamówienie', () => {
    let cenaproduktu;
    const imieNazwisko = 'Bartek Mackiewicz'
    const ulicaINumer = 'Przykładowa Ulica 1'
    const kodPocztowy = '00-000'
    const miejscowosc = 'Przykładowa miejscowość'
    const telefon = '000000000'
    const email = 'b.mackiewicz88@wp.pl'

describe('E2E - Zamówienie-przejście do podsumowania', () => {
    it('złożenie zamówienia', () => { 
        cy.clearCookies();
                 /*

      Starting: Use Node 18.12.1  
      Cypress": "^12.11.0",
      Rozdzielczość: 1000 x 660   

      */
        // Kroki:
        // Krok nr. 1 - otwarcie strony x-kom
        cy.visit("https://www.x-kom.pl/");
        // Krok nr. 2 - werefikacja widoczności modala
        cy.get('[title="Dostosowujemy się do Ciebie"]').should('contain', 'Dostosowujemy się do Ciebie');
        // Krok nr. 3 - akceptacja modala
        cy.get('.dRLEBj').click();
        cy.wait(3000);
        // Krok nr.4 - sprawdzenie cookie
        cy.getCookie('trackingPermissionConsentsValue').then((cookie) => {
            const dekodowanaWartosc = decodeURIComponent(cookie.value);
            const przeanalizowanaWartosc = JSON.parse(dekodowanaWartosc);
            expect(przeanalizowanaWartosc.cookies_analytics).to.be.true;
            expect(przeanalizowanaWartosc.cookies_personalization).to.be.true;
            expect(przeanalizowanaWartosc.cookies_advertisement).to.be.true;
        });
        // Krok nr.5 - dodanie pierwszego dostępnego elementu do koszyka
        cy.get('.sc-15ih3hi-0.sc-1j3ie3s-1.iGsnKy').first().click({force: true});
        // Krok nr. 6 - werefikacja widoczności modala o dodaniu do koszyka
        cy.get('.AGakh').should('contain', 'Produkt dodany do koszyka')
        // Krok nr. 7 - kliknięcie przejdź do koszyka 
        cy.get('.dQxHSV').click();
        // Krok nr. 8 - werefikacja zawartości koszyka
        cy.get('.jTgJzw').should('contain', 'Xiaomi POCO M4 Pro 6/128GB Power Black');
        // Krok nr. 9 - rozwinięcie dropdown z ilością sztuk
        cy.wait(3000);
        cy.get('.Select-control').click();
        // Krok nr. 10 - wybranie 2 szt.
        cy.get('#react-select-id1--option-1').click();
        // Krok nr. 11 - werefikacja komunikatu o zmianie ilości sztuk
        cy.get('.dxvSmT').should('contain', 'Liczba produktów zmieniona.');
        // Krok nr. 12 - werefikacja wybranych dwóch produktów
        cy.get('.Select-value-label').should('contain', '2');
        // Krok nr. 13 - werefikacja łącznej kwoty koszyka
        cy.get('.kFbTwX').invoke('text').then(wartosc1 => {
            cy.log(wartosc1)
                cenaproduktu = parseInt(wartosc1);
        })
        cy.get('.sc-pvj85d-3.iSxvSJ').invoke('text').then(wartosc2 => {
            cy.log(wartosc2)
                expect(parseInt(wartosc2)).to.approximately(cenaproduktu * 2, 0.01);
        }) 
        // Krok nr. 14 - przejście do dostawy
        cy.wait(3000);
        cy.get('.cnUgwg').click();
        // Krok nr. 15 - werefikacja przejscia na stronę /zamowienie/logowanie-lub-rejestracja
        cy.url().should('include', '/zamowienie/logowanie-lub-rejestracja')
        // Krok nr. 16 - klikniecie kontynuuj jako gość
        cy.wait(4000);
        cy.once('uncaught:exception', () => false);
        cy.get('button').contains('Kontynuuj jako gość').click();
    })

    it('wypełnienie danych i podsumowanie', () => {
        // Krok nr. 17 - werefikacja przejscia na stronę /zamowienie
        cy.url().should('include', '/zamowienie');
        // Krok nr. 18 - werefikacja zawartości koszyka
        cy.wait(3000);
        cy.clearCookies();
        cy.once('uncaught:exception', () => false);
        cy.get('.cKqnb').should('contain', 'Xiaomi POCO M4 Pro 6/128GB Power Black');
        // Krok nr. 19 - werefikacja wybranych dwóch produktów
        cy.get('.ijvGMo').should('contain', '2');
        // Krok nr. 20 - werefikacja łącznej kwoty koszyka
        cy.get('.grmHu').invoke('text').then(wartosc1 => {
            cy.log(wartosc1)
                cenaproduktu = parseInt(wartosc1);
        })
        cy.get('.iSxvSJ').invoke('text').then(wartosc2 => {
            cy.log(wartosc2)
                expect(parseInt(wartosc2)).to.approximately(cenaproduktu * 2, 0.01);
        }) 
        // Krok nr. 21 - wybrór dostawa kurierem
        cy.get('[title="Dostawa kurierem"]').click();
        // Krok nr. 22 - wybór osoba prywatna
        cy.get('.sc-1q3qfix-1.mzvqY').first().click({force: true});
        // Krok nr. 23 - wprowadzenie imienia i nazwiska
        cy.get('[name="recipientName"]').type(imieNazwisko, {delay: 500});
        // Krok nr. 24 - wprowadzenie ulicy i numeru
        cy.get('[name="recipientStreet"]').type(ulicaINumer, {delay: 500});
        // Krok nr. 25 - wprowadzenie kodu pocztowego
        cy.get('[name="recipientPostalCode"]').type(kodPocztowy, {delay: 500});
        // Krok nr. 26 - wprowadzenie miejscowości
        cy.get('[name="recipientCity"]').type(miejscowosc, {delay: 500});
        // Krok nr. 27 - wprowadzenie telefonu
        cy.get('[name="recipientPhoneNumber"]').type(telefon, {delay: 500});
        // Krok nr. 28 - wprowadzenie email
        cy.get('[name="recipientEmail"]').type(email, {delay: 500}); 
        // Krok nr. 29 - wybrór przelewu tradycyjnego
        cy.get('[title="Przelew tradycyjny"]').click();
        cy.get(".dpDrXq").find("input").then(checkbox => {
            cy.get(checkbox).eq(0).check({force: true}).invoke('prop', 'checked').then(zaznaczony => {
                cy.log(zaznaczony)
            });
        })
        // Krok nr. 30 - kliknięcie przejdź do podsumowania
        cy.get('.cnUgwg').click();
        // Krok nr. 31 - werefikacja przejscia na stronę /zamowienie/podsumowanie
        cy.url().should('include', '/zamowienie/podsumowanie');
        // Krok nr. 32 - werefikacja wprowadzonych danych
        cy.get('.bRdujy').should('contain', imieNazwisko);
        cy.get('. jEqlzJ').should('contain', ulicaINumer);
        cy.get('. jEqlzJ').should('contain', '00-000 Przykładowa miejscowość');
        cy.get('.eETCwo').should('contain', 'e-mail: b.mackiewicz88@wp.pl');
        cy.get('. jEqlzJ').should('contain', 'tel. 000000000');
    })

})
})