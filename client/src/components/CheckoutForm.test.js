import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const formHeader = screen.getByText("Checkout Form");

  expect(formHeader).toHaveTextContent(/checkout form/i)
});

test("form shows success message on submit with form details", () => {
  render(<CheckoutForm />);

  const firstName = screen.getByLabelText(/first name:/i);
  const lastName = screen.getByLabelText(/last name:/i);
  const address = screen.getByLabelText(/address:/i);
  const city = screen.getByLabelText(/city:/i);
  const state = screen.getByLabelText(/state:/i);
  const zipCode = screen.getByLabelText(/zip:/i);
  const button = screen.getByRole("button");

  fireEvent.change(firstName, {target: {value: "Mychael"}});
  fireEvent.change(lastName, {target: {value: "Menges"}});
  fireEvent.change(address, {target: {value: "123 address lane"}});
  fireEvent.change(city, {target: {value: "city"}});
  fireEvent.change(state, {target: {value: "ID"}});
  fireEvent.change(zipCode, {target: {value: "12345"}});

  fireEvent.click(button);

  const successMessage = screen.getByTestId(/successMessage/i);
  const formDetails = screen.getAllByTestId(/formdetails/i);

  expect(formDetails[0]).toHaveTextContent("Mychael Menges");
  expect(formDetails[1]).toHaveTextContent("123 address lane");
  expect(formDetails[2]).toHaveTextContent(/city, id 12345/i);
});
