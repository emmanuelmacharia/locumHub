import type { ChartConfig } from ".";
import { isClient } from "@vueuse/core";
import { useId } from "reka-ui";
import { h, render } from "vue";

// Simple cache using a Map to store serialized object keys
const cache = new Map<string, string>();

// Convert object to a consistent string key
/**
 * Produces a deterministic JSON string for an object by sorting its keys.
 *
 * @param key - The object to serialize; its own enumerable keys are sorted prior to serialization
 * @returns The JSON string representation of `key` with keys in lexicographically sorted order
 */
function serializeKey(key: Record<string, any>): string {
  return JSON.stringify(key, Object.keys(key).sort());
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Constructor<P = any> {
  __isFragment?: never;
  __isTeleport?: never;
  __isSuspense?: never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): {
    $props: P;
  };
}

/**
 * Create a renderer that renders the provided Vue component to an HTML string for chart payloads and caches the result.
 *
 * The returned renderer accepts a chart payload and an `x` value, renders the component into a temporary container, and caches the resulting HTML using a stable instance id combined with a deterministic serialization of the payload to avoid repeated renders.
 *
 * @param config - Chart configuration passed to the component as `config`
 * @param component - Vue component constructor to render; the component receives `payload`, `config`, and `x` props
 * @param props - Optional additional props to spread onto the component when rendering
 * @returns A renderer function that takes `_data` and `x` and returns the component's rendered HTML string, or `undefined` when not running on the client
 */
export function componentToString<P>(
  config: ChartConfig,
  component: Constructor<P>,
  props?: P,
) {
  if (!isClient) return;

  // This function will be called once during mount lifecycle
  const id = useId();

  // https://unovis.dev/docs/auxiliary/Crosshair#component-props
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (_data: any, x: number | Date) => {
    const data = "data" in _data ? _data.data : _data;
    const serializedKey = `${id}-${serializeKey(data)}`;
    const cachedContent = cache.get(serializedKey);
    if (cachedContent) return cachedContent;

    const vnode = h<unknown>(component, { ...props, payload: data, config, x });
    const div = document.createElement("div");
    render(vnode, div);
    cache.set(serializedKey, div.innerHTML);
    return div.innerHTML;
  };
}
