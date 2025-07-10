import { StyleSheet, Text, View } from "react-native";
import CodeHighlighter from "react-native-code-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function PostCardPostBody({ content }) {
  const partsRegex = /```(?:([\w+-]+)?\s*\n)?([\s\S]*?)```/g;

  const elements = [];

  let lastIndex = 0;
  let match;

  // Iterate over all code blocks
  while ((match = partsRegex.exec(content)) !== null) {
    const [fullMatch, lang, code] = match;
    const start = match.index;

    // Add text before the code block
    if (start > lastIndex) {
      const text = content.slice(lastIndex, start);
      elements.push({ type: "text", content: text });
    }

    // Add the code block
    elements.push({ type: "code", language: lang || "text", content: code });

    lastIndex = start + fullMatch.length;
  }

  // Add remaining text after the last code block
  if (lastIndex < content?.length) {
    elements.push({ type: "text", content: content.slice(lastIndex) });
  }

  return (
    <View
      style={{
        gap: 12,
        backgroundColor: "#111827",
        paddingHorizontal: 20,
        paddingVertical: 20,
      }}
    >
      {elements.map((el, i) =>
        el.type === "code" ? (
          <CodeHighlighter
            key={i}
            language={el.language}
            hljsStyle={atomOneDark}
            containerStyle={styles.codeContainer}
            textStyle={styles.codeText}
          >
            {el.content.trim()}
          </CodeHighlighter>
        ) : (
          <Text key={i} style={styles.text}>
            {el.content.trim()}
          </Text>
        ),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    padding: 16,
    backgroundColor: "#111827",
  },
  codeText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
  },
  text: {
    fontSize: 16,
    color: "#e5e5e5",
    lineHeight: 24,
  },
});
