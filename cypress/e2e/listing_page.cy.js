context('ListingPage', () => {
    const wyswietlenieMenu = 'Menu';
    const wyswietlenieLaptopy = 'Laptopy i komputery';

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
        // Krok nr. 5 - Klikniecie w przycisk menu
        cy.get('.cLRUne').click();
        // Krok nr. 6 - Sprawdzenie wyświetlenia listy menu
        cy.get('.jZkUHL').should('contain', wyswietlenieMenu);
        // Krok nr. 7 - wybór kategorii laptopy i komputery
        cy.get('.sc-1tblmgq-0.sc-1tblmgq-4.cFcLNt.sc-a8nzxk-6.PpbcL').first().click();
        // Krok nr. 8 - Sprawdzenie wyświetlenia kategorii listy laptopy i komputery
        cy.get('.jZkUHL').should('contain', wyswietlenieLaptopy);
        // Krok nr. 9 - kliknięcie w przycisk "Pokaż Laptopy i komputery"
        cy.get('[title="Pokaż Laptopy i komputery"]').click();
        // Krok nr. 10 - werefikacja przejscia na stronę /g/2-laptopy-i-komputery.html
        cy.url().should('include', '/g/2-laptopy-i-komputery.html');
        // Krok nr. 11 - werefikacja tytułu strony laptopy i komputery
        cy.get('#listing-naglowek').should('contain', 'Laptopy i komputery');
        // Krok nr. 12 - wybór pierwszego produktu z listy
        cy.get('.sc-16n31g-4.jWhMsI').first().click();
         // Krok nr. 13 - werefikacja przejscia na stronę /g-2/c/159-laptopy-notebooki-ultrabooki.html
        cy.url().should('include', '/g-2/c/159-laptopy-notebooki-ultrabooki.html');
        // Krok nr. 14 - werefikacja tytułu strony Laptopy/Notebooki/Ultrabooki
        cy.get('.vLfrh').should('contain',  'Laptopy/Notebooki/Ultrabooki');
        // Krok nr. 15 - ponowne klikniecie w przycisk menu
        cy.get('.cLRUne').click();
        // Krok nr. 16 - Sprawdzenie wyświetlenia listy menu
        cy.get('.jZkUHL').should('contain', wyswietlenieMenu);
        // Krok nr. 17 - kliknięcie prawej strzałki dla paginacji górnej
        cy.get('.sc-1tblmgq-0.sc-1tblmgq-4.cFcLNt.sc-a8nzxk-6.PpbcL').eq(1).click();
        // Krok nr. 18 - kliknięcie w przycisk "Smartfony i smartwatche"
        cy.get('[title="Pokaż Smartfony i smartwatche"]').click();
        cy.wait(3000);
        // Krok nr. 19 - werefikacja przejscia na stronę /g/4-smartfony-i-smartwatche.html
        cy.url().should('include', '/g/4-smartfony-i-smartwatche.html');
        // Krok nr. 20 - werefikacja tytułu strony Smartfony i smartwatche
        cy.get('.jzwSta').should('contain',  'Smartfony i smartwatche')
        // Krok nr. 21 - wybór pierwszego produktu z listy
        cy.get('.sc-16n31g-4.jWhMsI').eq(1).click();
        // Krok nr. 22 - sprawdzenie ilości przed użyciem filtra
        cy.get('.gMCwLf').eq(1).invoke('text').then(wartosc1 => {
            cy.log(wartosc1)
        })
        // Krok nr. 23 - wybór pierwszego producenta z listy
        cy.get('.sc-3qnozx-3.ejgVFR').eq(0).check({force: true})
        // Krok nr. 24 - werefikacja przejscia na stronę /g-4/c/1590-smartfony-i-telefony.html?producent=1023-xiaomi
        cy.url().should('include', '/g-4/c/1590-smartfony-i-telefony.html?producent=1023-xiaomi');       
        // Krok nr. 25 - sprawdzenie ilości po użyciu filtra
        cy.get('.gMCwLf').eq(1).invoke('text').then(wartosc2 => {
            cy.log(wartosc2)
        })
        // Krok nr. 26 - kliknięcie przycisku wyczyść filtry
        cy.get('.hoHRjW').click();
        // Krok nr. 27 - sprawdzenie ilości po użyciu filtra
        cy.get('.gMCwLf').eq(1).invoke('text').then(wartosc3 => {
        cy.log(wartosc3)
        })
    })


})
})