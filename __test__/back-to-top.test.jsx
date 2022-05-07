import { render, RenderResult } from "@testing-library/react";
import BackToTop from "../components/back-to-top.component";

let documentBody;
describe("<BackToTop />", () => {
  beforeEach(() => {
    documentBody = render(<BackToTop />);
  });
  it("shows content in <BackToTop />", () => {
    const { baseElement } = documentBody;
    expect(baseElement).toMatchSnapshot();
  });
});
