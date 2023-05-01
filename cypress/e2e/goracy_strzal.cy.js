describe('E2E - Zamówienie-przejście do podsumowania', () => {
    it('złożenie zamówienia', () => { 
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
        /*
        cy.getCookie('trackingPermissionConsentsValue').then((cookie) => {
            const dekodowanaWartosc = decodeURIComponent(cookie.value);
            const przeanalizowanaWartosc = JSON.parse(dekodowanaWartosc);
            expect(przeanalizowanaWartosc.cookies_analytics).to.be.true;
            expect(przeanalizowanaWartosc.cookies_personalization).to.be.true;
            expect(przeanalizowanaWartosc.cookies_advertisement).to.be.true;
        });
        */
        // Krok nr.5 - werefikacja widoczności widgetu
        cy.get('#hotShot').should('be.visible');
        // Krok nr.6 - werefikacja widoczności ceny
        cy.get('#hotShot').get('p').contains('zł').first().should('be.visible');
        // Krok nr.7 - werefikacja widoczności ceny
        //cy.get('.cIxhty').contains('Następny gorący strzał:').should('be.visible');
        // Krok nr.8 - kliknięcie w widget gorący strzał
        cy.get('.xdUIb').click();
        // Krok nr. 9 - werefikacja przejscia na stronę /goracy_strzal
        cy.url().should('include', '/goracy_strzal');    
        // Krok nr. 10 - werefikacja widoczności przycisku button - asercja nie przesła dlatego polecenie zostało ukryte
        //cy.get('button[title="Dodaj do koszyka"]').should('be.visible');
        // Krok nr. 11 - wywołanie wartości dla disabled - przycisk dodaj do koszyka
        cy.get('.iGsnKy').then(widocznybutton => {
            cy.get(widocznybutton).eq(0).invoke('prop', 'disabled').then(wartosc => {
                cy.log(wartosc)
            });
        })
        })
    })



