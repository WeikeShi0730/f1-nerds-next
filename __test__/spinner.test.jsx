import { render } from "@testing-library/react";
import Spinner from "../components/spinner.component";

let documentBody;
describe("<Spinner />", () => {
  beforeEach(() => {
    documentBody = render(<Spinner />);
  });
  it("shows content in <Spinner />", () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
