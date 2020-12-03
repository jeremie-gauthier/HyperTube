import movieReducer, {
  initialState as movieState,
} from "@/state/movies/reducer";
import { setSearchInput } from "@/state/movies/actions";
import userReducer, { initialState as userState } from "@/state/users/reducer";
import { setLang } from "@/state/users/actions";

// Some of the following tests are bad typed, but this is intended.
// The purpose here is to test the default case when an unknown action is send.

describe("Movie", () => {
  test("default case", () => {
    expect(movieReducer(movieState, { type: "COMTE" })).toEqual(movieState);
  });

  test("SET_SEARCH_INPUT", () => {
    const expectedState = { ...movieState, searchInput: "GRUYERE" };
    expect(movieReducer(movieState, setSearchInput("GRUYERE"))).toEqual(
      expectedState,
    );
  });
});

describe("User", () => {
  test("default case", () => {
    expect(userReducer(userState, { type: "CAMEMBERT" })).toEqual(userState);
  });

  test("SET_LANG", () => {
    const expectedState = { ...userState, lang: "es" };
    expect(userReducer(userState, setLang("es"))).toEqual(expectedState);
  });
});
