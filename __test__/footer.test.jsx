import { render } from "@testing-library/react";
import Footer from "../components/footer.component";

let documentBody;
describe("<Footer />", () => {
  beforeEach(() => {
    documentBody = render(<Footer />);
  });
  it("shows content in <Footer />", () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
