# TECHNICAL SPECIFICATION

## Glow Care Demo Store — Ecommerce Website for Google Tag Manager, GA4 and Meta Pixel Practice

### 1. Project Overview

Project name: Glow Care Demo Store

Project type: Educational ecommerce website

Purpose: To create a functional demo online store for practicing Google Tag Manager (GTM), Google Analytics 4 (GA4), and Meta Pixel implementation, configuration, debugging, and event tracking.

Target user: A beginner digital marketer with no previous web development or analytics implementation experience.

The website will simulate a small skincare ecommerce store. It must allow users to browse products, view product details, add items to a cart, proceed to checkout, and complete a simulated purchase.

The project is intended exclusively for educational purposes.

No real payments, actual customer orders, backend services, or production customer data are required.

The primary learning objectives are:

* Understand how Google Tag Manager works.
* Learn how to configure GA4 through GTM.
* Learn how to configure Meta Pixel through GTM.
* Understand the relationship between website interactions, dataLayer events, GTM triggers, and analytics tags.
* Practice ecommerce event tracking.
* Debug and validate events using GTM Preview, GA4 DebugView, and Meta Events Manager.
* Learn how to identify and prevent duplicate events.

---

# 2. Technology Stack

Use a simple, beginner-friendly technology stack.

### Required technologies

* React — user interface and reusable components.
* TypeScript — type safety and structured data.
* Vite — development server and production build.
* HTML5 — website structure.
* CSS3 — styling and responsive layout.
* Lucide React — icons, if needed.
* localStorage — local cart persistence.

### Development requirements

* Use the latest stable versions compatible with each other.
* Use npm as the package manager.
* Use functional React components and React Hooks.
* Use TypeScript interfaces or types for products, cart items, and analytics events.
* Use CSS Modules or a simple global CSS structure.
* Keep the project lightweight and easy to understand.
* Avoid unnecessary dependencies.

### Do not use

* Paid libraries or services.
* Redux or other complex state management libraries.
* Material UI, Ant Design, or other large UI frameworks.
* A database.
* A backend server.
* A real payment gateway.
* A real order management system.
* A real CRM.
* Server-side tracking.
* Meta Conversions API.
* Google Analytics libraries that bypass GTM.

The website must use Google Tag Manager as the central tool for managing marketing and analytics tags.

---

# 3. Website Concept and Design

Create a fictional skincare ecommerce brand called Glow Care.

The website should look like a modern, minimalistic skincare store.

### Visual style

* Clean and modern design.
* Light beige, cream, white, and soft neutral colors.
* Minimalist product cards.
* Large product images.
* Clear calls to action.
* Simple navigation.
* Generous whitespace.
* Professional ecommerce layout.
* Responsive design for desktop, tablet, and mobile.

### Language and currency

* Website language: Ukrainian.
* Currency: UAH.
* Prices must be displayed in Ukrainian hryvnia.
* Product names and descriptions must be written in Ukrainian.

### General UX requirements

* All buttons must work.
* Navigation must work.
* The cart must update dynamically.
* The website must not reload unnecessarily during interactions.
* Forms must include basic validation.
* Provide clear success and error messages.
* The website must work without GTM or Meta Pixel configured.

---

# 4. Website Structure

Create the following pages or functional views.

## 4.1. Homepage

The homepage must include:

* Brand logo: Glow Care.
* Header navigation.
* Cart icon with item count.
* Hero section.
* Main headline.
* Short brand description.
* Primary CTA button: "Обрати догляд".
* Featured products section.
* Benefits section.
* Footer.

The primary CTA should scroll to the product catalog.

## 4.2. Product Catalog

Create at least four fictional skincare products.

Use the following products:

| Product ID    | Product Name              |   Price |
| ------------- | ------------------------- | ------: |
| cream_001     | Зволожувальний крем       | 450 UAH |
| serum_002     | Сироватка для обличчя     | 620 UAH |
| cleanser_003  | Очищувальний гель         | 380 UAH |
| sunscreen_004 | Сонцезахисний крем SPF 50 | 550 UAH |

Each product must have:

* Product ID.
* Product name.
* Product category.
* Price.
* Description.
* Image.
* "Детальніше" button.
* "Додати в кошик" button.

Store product information in a separate data file.

Use local placeholder images or royalty-free image URLs that are reliable and suitable for a demo website.

Do not use copyrighted product photography from real brands without permission.

## 4.3. Product Details

When the user clicks "Детальніше", open a product details page or modal.

Display:

* Product image.
* Product name.
* Product description.
* Product category.
* Price.
* Quantity selector.
* "Додати в кошик" button.

The product details view must support analytics tracking.

## 4.4. Shopping Cart

The cart must support:

* Adding products.
* Increasing product quantity.
* Decreasing product quantity.
* Removing products.
* Displaying product prices.
* Calculating subtotal.
* Displaying total value.
* Proceeding to checkout.

The cart must persist in localStorage after page refresh.

The cart must display an empty state when no products are added.

## 4.5. Checkout

Create a simulated checkout page.

The checkout form must include:

* First name.
* Email.
* Phone number.
* Delivery method.
* Checkbox for agreement to the demo terms.

Use basic client-side validation.

Do not send form data to a server.

Do not store personal information in analytics systems.

The checkout page must display:

* Selected products.
* Quantities.
* Total order value.
* Delivery method.
* "Підтвердити замовлення" button.

## 4.6. Order Confirmation

After successful form submission:

* Display a confirmation message.
* Generate a unique demo transaction ID.
* Display the transaction ID.
* Display the order total.
* Display the purchased products.
* Clear the shopping cart.
* Provide a button to return to the homepage.

The purchase event must be generated only after successful order confirmation.

Prevent duplicate purchase events if the user refreshes the confirmation page.

Do not implement real payments.

---

# 5. Google Tag Manager Integration

Google Tag Manager must be the central tag management system.

## 5.1. GTM installation

Prepare the website for standard Google Tag Manager installation.

Use the official GTM installation method.

Provide a configurable GTM container ID.

Use a placeholder:

GTM-XXXXXXX

Do not invent a real GTM ID.

The website must continue working if the GTM ID is missing.

The GTM ID must be configurable without editing React components.

Document exactly where the user should insert the GTM ID.

## 5.2. Tag management requirements

The website must support:

* Google tag.
* GA4 event tags.
* Meta Pixel base code.
* Meta Pixel standard event tags.
* Custom event tracking.
* GTM Preview mode.
* Tag Assistant debugging.

Do not hardcode GA4 Measurement ID or Meta Pixel ID in the website source code.

These IDs must be configured in GTM.

## 5.3. Recommended GTM architecture

The website should push interaction events into dataLayer.

GTM should listen for those events and trigger the appropriate tags.

Example:

Website interaction → dataLayer event → GTM trigger → GA4 tag and/or Meta Pixel tag.

Do not send analytics events directly from React components to GA4 or Meta Pixel.

---

# 6. dataLayer Implementation

Create a separate, reusable, and typed dataLayer utility.

Suggested file:

src/analytics/dataLayer.ts

The utility should support:

* Initializing dataLayer safely.
* Pushing custom events.
* Pushing ecommerce events.
* Supporting typed event payloads.
* Clearing previous ecommerce objects before sending new ecommerce events.
* Handling the absence of GTM without errors.

Use the standard structure:

window.dataLayer.push({
event: "event_name"
});

For ecommerce events, use the recommended GA4 ecommerce structure.

Example:

window.dataLayer.push({
event: "add_to_cart",
ecommerce: {
currency: "UAH",
value: 450,
items: [
{
item_id: "cream_001",
item_name: "Зволожувальний крем",
price: 450,
quantity: 1
}
]
}
});

Before each ecommerce event, clear the previous ecommerce object:

window.dataLayer.push({
ecommerce: null
});

Then push the new ecommerce event.

Do not send personal information through dataLayer.

Do not include:

* Names.
* Email addresses.
* Phone numbers.
* Delivery addresses.
* Other personally identifiable information.

---

# 7. Google Analytics 4 Event Tracking

Implement the website interactions required for GA4 ecommerce tracking.

All events must be sent through GTM.

The website should push events into dataLayer. GTM will be configured separately by the learner.

## 7.1. Required GA4 events

### Basic events

| Event             | When it fires                               |
| ----------------- | ------------------------------------------- |
| page_view         | When a page or tracked view is opened       |
| view_item_list    | When the product catalog is viewed          |
| select_item       | When a user selects a product               |
| view_item         | When product details are opened             |
| add_to_cart       | When a product is added to the cart         |
| remove_from_cart  | When a product is removed                   |
| view_cart         | When the cart is opened                     |
| begin_checkout    | When checkout begins                        |
| add_shipping_info | When a delivery method is selected          |
| purchase          | When a demo order is successfully completed |

## 7.2. Ecommerce event parameters

For ecommerce events, include the appropriate parameters:

* currency.
* value.
* items.
* item_id.
* item_name.
* item_category.
* price.
* quantity.

For purchase events, include:

* transaction_id.
* currency.
* value.
* items.

Use UAH as the currency.

Use numeric values for prices and totals.

Ensure that item quantities and order totals are calculated correctly.

## 7.3. page_view requirements

The website uses React and may behave as a single-page application.

Implement page_view tracking carefully.

Avoid duplicate page_view events.

Document how to configure page_view tracking through GTM.

Explain the difference between:

* Browser page loads.
* SPA route changes.
* GA4 automatic page_view tracking.
* GTM-managed page_view tracking.

Choose one consistent approach and explain how to avoid duplicate events.

## 7.4. Purchase event requirements

The purchase event must:

* Fire only after successful demo order confirmation.
* Include a unique transaction_id.
* Include the correct total order value.
* Include the purchased items.
* Use currency UAH.
* Not fire when the checkout form is invalid.
* Not fire when the user simply opens the checkout page.
* Not fire again after refreshing the confirmation page.

Use localStorage or another simple client-side mechanism to prevent duplicate purchase events.

Do not use real customer information.

---

# 8. Additional Custom Events

Implement the following optional custom events:

| Event       | When it fires                                  |
| ----------- | ---------------------------------------------- |
| click_cta   | When the main CTA is clicked                   |
| form_start  | When the user begins interacting with checkout |
| form_submit | When the demo form is successfully submitted   |

Use clear and consistent event names.

Do not fire form_submit before successful validation.

Do not send form field values to analytics.

These events should be optional and easy to enable or disable.

---

# 9. Meta Pixel Integration

Prepare the website for Meta Pixel implementation through Google Tag Manager.

Meta Pixel must not be hardcoded directly into React components.

Do not install Meta Pixel independently through a plugin or another script if it is already configured through GTM.

## 9.1. Meta Pixel configuration

The website must support:

* Meta Pixel base code.
* Meta standard events.
* Ecommerce parameters.
* Testing through Meta Events Manager.
* Testing through Meta Pixel Helper.

The Meta Pixel ID must be configured in GTM.

Use a placeholder for documentation:

META_PIXEL_ID

Do not invent a real Pixel ID.

The website must continue functioning if Meta Pixel is not configured.

## 9.2. Required Meta Pixel events

| Website interaction             | Meta Pixel event |
| ------------------------------- | ---------------- |
| Page view                       | PageView         |
| Product details opened          | ViewContent      |
| Product added to cart           | AddToCart        |
| Checkout started                | InitiateCheckout |
| Successful demo form submission | Lead             |
| Successful demo purchase        | Purchase         |

Use standard Meta event names with the correct capitalization.

## 9.3. Meta Pixel event parameters

For ecommerce events, support the following parameters where applicable:

* content_ids.
* content_name.
* content_type.
* contents.
* value.
* currency.

For Purchase, send:

* value.
* currency.
* contents.
* content_ids.

Use UAH as the currency.

For content_type, use "product".

Use product IDs from the product catalog.

## 9.4. Meta Pixel and dataLayer

The website should push the same underlying user interactions into dataLayer.

GTM will map these interactions to the corresponding Meta Pixel events.

Do not create separate, duplicate interaction handlers solely for Meta Pixel.

The same add_to_cart interaction should be available for both GA4 and Meta Pixel.

## 9.5. Meta Pixel testing

Document how to:

* Create or access a Meta Pixel.
* Find the Pixel ID.
* Configure the base code in GTM.
* Configure standard event tags.
* Configure event parameters.
* Test events using Meta Pixel Helper.
* Verify events in Meta Events Manager.
* Identify duplicate events.

No real advertising campaign is required.

---

# 10. Consent and Privacy

This is a demo project, but privacy requirements must still be considered.

Do not send personal information to GA4 or Meta Pixel.

Do not collect actual customer data.

Use fictional test values only.

Do not implement advanced consent management unless required for the learning exercise.

However, document that real websites may require consent management depending on applicable privacy laws, user location, and advertising configuration.

If a consent banner is implemented, analytics and advertising tags must respect the user's consent choices.

Do not claim that the demo website is legally compliant for production use.

---

# 11. Website Attributes for GTM

Add useful HTML attributes to interactive elements.

Examples:

data-gtm="add-to-cart"

data-gtm="checkout"

data-gtm="product-details"

data-gtm="cta"

These attributes should help the learner create GTM triggers.

Use semantic HTML where possible.

Buttons must have clear and accessible labels.

Avoid relying on unstable CSS selectors.

Document which elements correspond to which events.

---

# 12. Project Structure

Use a clean and understandable file structure.

Suggested structure:

src/
components/
Header.tsx
Footer.tsx
ProductCard.tsx
ProductDetails.tsx
Cart.tsx
CheckoutForm.tsx
OrderConfirmation.tsx

data/
products.ts

analytics/
dataLayer.ts
analyticsTypes.ts

hooks/
useCart.ts

pages/
HomePage.tsx
CheckoutPage.tsx
ConfirmationPage.tsx

styles/
global.css

App.tsx
main.tsx

index.html
package.json
tsconfig.json
vite.config.ts
README.md

The structure may be adjusted if needed, but keep it simple and beginner-friendly.

---

# 13. Testing Requirements

Before delivering the project, test the following scenarios.

## Functional testing

1. Homepage loads successfully.
2. Product catalog displays all products.
3. Product details open correctly.
4. Products can be added to the cart.
5. Cart quantity can be changed.
6. Products can be removed.
7. Cart total is correct.
8. Cart persists after refresh.
9. Checkout form validates required fields.
10. Invalid forms cannot be submitted.
11. Valid demo orders can be completed.
12. Confirmation page displays the correct order total.
13. Cart is cleared after purchase.
14. Refreshing the confirmation page does not create another purchase event.

## Analytics testing

1. dataLayer exists.
2. Events are pushed correctly.
3. Ecommerce objects contain the correct parameters.
4. Personal data is not included in analytics payloads.
5. GTM can be installed through the provided configuration.
6. GA4 events can be configured through GTM.
7. Meta Pixel events can be configured through GTM.
8. Duplicate events are avoided.
9. The site works when GTM is not configured.
10. The site works when Meta Pixel is not configured.

Do not claim that GA4 or Meta Pixel has been verified unless the required IDs and test tools have actually been configured.

---

# 14. Deployment Requirements

The project must be easy to run locally and publish online.

Provide instructions for:

* Installing Node.js if necessary.
* Installing dependencies.
* Running the development server.
* Building the project.
* Previewing the production build.
* Publishing the website using a free static hosting option.

Possible hosting options include:

* GitHub Pages.
* Netlify.
* Vercel.

Choose one recommended option and provide beginner-friendly instructions.

Do not require paid hosting.

Explain that a publicly accessible HTTPS website is useful for testing marketing tags.

---

# 15. Documentation Requirements

Provide a complete README in English.

The README must explain:

1. What the project is.
2. Which technologies are used.
3. How to install dependencies.
4. How to run the project.
5. How to build the project.
6. How to deploy the website.
7. Where to configure the GTM ID.
8. How to create a GA4 property.
9. How to configure the Google tag in GTM.
10. How to configure GA4 event tags.
11. How to configure Meta Pixel.
12. How to configure Meta standard events.
13. How to use GTM Preview.
14. How to test GA4 events.
15. How to test Meta Pixel events.
16. How to identify duplicate events.
17. How to troubleshoot common problems.

Include a table mapping each website interaction to:

* dataLayer event name.
* GA4 event name.
* Meta Pixel event name.
* Required parameters.
* Expected trigger condition.

Explain the difference between a dataLayer event and an analytics event.

---

# 16. Delivery Instructions

Work in stages.

### Stage 1: Planning

First, provide:

* A short implementation plan.
* The proposed project structure.
* The package list.
* A brief explanation of the architecture.

Do not generate the entire project before explaining the plan.

### Stage 2: Website development

Create the functional website.

Ensure all main interactions work before implementing analytics.

### Stage 3: dataLayer implementation

Add typed dataLayer utilities and ecommerce event payloads.

Explain how to inspect the dataLayer in the browser.

### Stage 4: GTM and analytics documentation

Provide step-by-step instructions for configuring GA4 and Meta Pixel through GTM.

Do not invent real account IDs.

### Stage 5: Testing and deployment

Verify the functional requirements.

Provide instructions for local testing and free deployment.

### Final delivery

Provide:

* Complete project source code.
* All required configuration files.
* README.
* Installation instructions.
* Deployment instructions.
* GTM implementation guide.
* GA4 event tracking guide.
* Meta Pixel implementation guide.
* Testing checklist.

Explain technical concepts in simple English suitable for a beginner.

The final result must be a working educational ecommerce website, not just a visual mockup.

Prioritize simplicity, clarity, and practical learning over unnecessary complexity.

￼