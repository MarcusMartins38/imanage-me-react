import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AboutMe from "../AboutMe";
import { Provider } from "react-redux";
import { store } from "../../redux/store";

function renderWithRedux(ui: React.ReactElement) {
    return render(<Provider store={store}>{ui}</Provider>);
}

describe("AboutMe", () => {
    test("Renders AboutMe Page", async () => {
        renderWithRedux(<AboutMe />);

        screen.debug();
        expect(
            screen.getByTestId("aboutme-introduction-testid"),
        ).toBeInTheDocument();
    });
});
