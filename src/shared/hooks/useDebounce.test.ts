import { renderHook, act } from "@testing-library/react"
import { useDebounce } from "./useDebounce"
import { describe, it, expect, vi } from "vitest"

describe("useDebounce", () => {
  vi.useFakeTimers()

  it("should return initial value", () => {
    const { result } = renderHook(() => useDebounce("test", 500))
    expect(result.current).toBe("test")
  })

  it("should update value after delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "test", delay: 500 },
      }
    )

    // Update the value
    rerender({ value: "updated", delay: 500 })

    // Should still be old value immediately after update
    expect(result.current).toBe("test")

    // Advance time by 500ms
    act(() => {
      vi.advanceTimersByTime(500)
    })

    // Now should be updated
    expect(result.current).toBe("updated")
  })

  it("should clear timeout on unmount", () => {
    const spy = vi.spyOn(global, "clearTimeout")
    const { unmount } = renderHook(() => useDebounce("test", 500))
    
    unmount()
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
