import { Home } from "../src/pages";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { ALBUM_SEARCH } from "../src/graphql/queries";

const mocks = [
  {
    request: {
      query: ALBUM_SEARCH,
      variables: {
        name: "DAMN",
      },
    },
    result: {
      data: {
        data: {
          search: {
            albums: {
              items: [
                {
                  name: "Being So Normal",
                },
                {
                  name: "Songs About Being Alone",
                },
              ],
            },
          },
        },
      },
    },
  },
];

describe("Front End", () => {
  it("renders without error", () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
  });

  it("renders h1", () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );
    const header = getByText("Buildify");
    expect(header).toBeTruthy();
  });
});
