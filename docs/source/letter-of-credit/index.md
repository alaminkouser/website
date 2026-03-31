---
title: Letter of Credit
date: 2026-04-01
keywords:
  - lc
  - letter-of-credit
  - trade-finance
  - import-export
  - import
  - export
  - maritime
  - banking
  - international-trade
---

A Letter of Credit (LC) is a financial instrument used in international trade to
ensure secure payment between a buyer and a seller. Banks act as intermediaries,
guaranteeing payment to the seller upon successful fulfillment of agreed
conditions and submission of compliant documents.

---

## Parties Involved

- **Buyer** - The importer who initiates the LC
- **Seller** - The exporter who supplies goods
- **Issuing Bank** - The buyer's bank that issues the LC
- **Advising Bank** - The seller's bank that verifies and communicates the LC
- **Shipping Entity (Ship)** - Responsible for transporting goods
- **Local Port of Buyer** - Final delivery point for goods

## Process Description

The Letter of Credit process begins when the buyer and seller agree on a
contract of sale. The seller first issues a **pro forma invoice** and later a
final version confirming all trade terms.

Following this, the buyer applies to the issuing bank to open a Letter of
Credit. Once the bank reviews and approves the application, it formally issues
the LC and sends it to the advising bank, typically located in the seller's
country. The advising bank verifies the authenticity of the LC and notifies the
seller.

After receiving confirmation, the seller proceeds to ship the goods through a
carrier. The shipping company issues a **Bill of Lading (B/L)**, which serves as
proof that the goods have been dispatched.

The seller then submits the B/L along with other required documents to the
advising bank. The advising bank carefully checks these documents to ensure they
comply with the terms and conditions specified in the LC. If everything is in
order, the documents are forwarded to the issuing bank.

Once the documents are verified, the advising bank pays the seller. The issuing
bank subsequently reimburses the advising bank and sends the shipping documents
to the buyer.

Finally, the buyer presents the Bill of Lading at the local port to claim the
goods. After verification by port authorities, the goods are released to the
buyer.

## Process Flow Diagram

```mermaid
sequenceDiagram
    accTitle: Letter of Credit
    accDescr: The sequence diagram illustrates the step-by-step process of an LC transaction.
    autonumber
    participant Local Port of Buyer
    actor Buyer
    participant Issuing Bank
    participant Advising Bank
    actor Seller
    participant Ship
    Buyer-->Seller: Agrees to a Contract of Sale
    Seller->>Buyer: Pro Forma Invoice
    Seller->>Buyer: Final Pro Forma Invoice
    Buyer->>Issuing Bank: Application To Open LC
    Note over Issuing Bank, Buyer: Grants the Application
    Buyer->>Issuing Bank: Makes Payment
    Note over Issuing Bank: Issues an LC
    Issuing Bank->>Advising Bank: Send the LC
    Advising Bank->>Seller: Notifies About the LC
    Seller->>Ship: Goods
    Ship->>Seller: B/L
    Ship->>Local Port of Buyer: Ships Goods
    Seller->>Advising Bank: B/L &<br>Other Documents
    Note over Advising Bank: Checks B/L Specification &<br>LC Specification
    Advising Bank->>Issuing Bank: Forwards B/L & Documents
    Advising Bank->>Seller: Pays Money
    Issuing Bank->>Advising Bank: Pays Money
    Issuing Bank->>Buyer: Forward B/L &<br>Other Documents
    Buyer->>Local Port of Buyer: Shows B/L
    Note over Local Port of Buyer: Checks B/L
    Local Port of Buyer->>Buyer: Provide Goods
```

## Key Documents

- **Pro Forma Invoice**
- **Final Invoice**
- **Letter of Credit (LC)**
- **Bill of Lading (B/L)**
- **Supporting Trade Documents**

## Benefits of Letter of Credit

### For the Seller

- Guaranteed payment from a bank
- Reduced risk of non-payment

### For the Buyer

- Payment made only after shipment proof
- Assurance that goods are dispatched as agreed
