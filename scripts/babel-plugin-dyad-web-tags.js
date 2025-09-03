module.exports = function dyadWebTags({ types: t }) {
  return {
    name: "dyad-web-tags",
    visitor: {
      JSXOpeningElement(path) {
        const name = path.node.name;
        // Ignore fragments and very low-level primitives if desired
        if (t.isJSXIdentifier(name)) {
          const compName = name.name;
          // Heuristic: tag only Capitalized components
          if (/^[A-Z]/.test(compName)) {
            const attrs = path.node.attributes || [];
            const hasId = attrs.some(
              (a) =>
                t.isJSXAttribute(a) && a.name && a.name.name === "data-dyad-id"
            );
            if (!hasId) {
              attrs.push(
                t.jsxAttribute(
                  t.jsxIdentifier("data-dyad-id"),
                  t.stringLiteral(`${compName}`)
                )
              );
              attrs.push(
                t.jsxAttribute(
                  t.jsxIdentifier("data-dyad-name"),
                  t.stringLiteral(`${compName}`)
                )
              );
              path.node.attributes = attrs;
            }
          }
        }
      },
    },
  };
};
