import { renderHook, act } from "@testing-library/react-hooks";
import useForm from "@/hooks/useForm";

const callback = jest.fn();
const resolver = jest.fn().mockImplementation(() => ({}));
const errorResolver = jest
  .fn()
  .mockImplementation(() => ({ username: "error" }));
const evt = {
  persist: jest.fn(),
  preventDefault: jest.fn(),
  target: { name: "username", type: "input", value: "Triss" },
} as unknown;

test("handleChange on text input field", () => {
  const { result } = renderHook(() =>
    useForm(callback, resolver, { username: "Yennefer" }),
  );

  act(() => {
    result.current.handleChange(evt as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.values).toEqual({ username: "Triss" });
});

test("handleChange when initiated with null values", () => {
  const { result } = renderHook(() => useForm(callback, resolver, null));

  act(() => {
    result.current.handleChange(evt as React.ChangeEvent<HTMLInputElement>);
  });

  expect(result.current.values).toBeNull();
});

test("handleChange on checkbox input", () => {
  const checkbox = ({
    persist: jest.fn(),
    preventDefault: jest.fn(),
    target: { name: "isAWitch", type: "checkbox", checked: true },
  } as unknown) as React.ChangeEvent<HTMLInputElement>;

  const { result } = renderHook(() =>
    useForm(callback, resolver, { isAWitch: false }),
  );

  act(() => {
    result.current.handleChange(checkbox);
  });

  expect(result.current.values).toEqual({ isAWitch: true });
});

test("handleSubmit with error", () => {
  const { result } = renderHook(() =>
    useForm(callback, errorResolver, { username: "Yennefer" }),
  );

  act(() => {
    result.current.handleSubmit(evt as React.ChangeEvent<HTMLFormElement>);
  });

  expect(result.current.errors).toEqual({ username: "error" });
});

test("handleSubmit without error", () => {
  const { result } = renderHook(() =>
    useForm(callback, resolver, { username: "Yennefer" }),
  );

  act(() => {
    result.current.handleSubmit(evt as React.ChangeEvent<HTMLFormElement>);
  });

  expect(result.current.errors).toEqual({});
});
