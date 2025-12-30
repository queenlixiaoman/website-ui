/**
 * 结构化数据组件
 *
 * 用于在页面中输出 JSON-LD 结构化数据（Schema.org）
 *
 * @param {Object} props
 * @param {Object|Array} props.data - 结构化数据对象或数组
 * @param {string} props.id - 可选的 script 标签 ID
 *
 * @example
 * // 单个 Schema
 * <StructuredData data={organizationSchema} />
 *
 * @example
 * // 多个 Schema
 * <StructuredData data={[organizationSchema, apartmentSchema]} />
 */
export default function StructuredData({ data, id }) {
  // 如果 data 是数组，转换为多个 script 标签
  if (Array.isArray(data)) {
    return (
      <>
        {data.map((schema, index) => (
          <script
            key = { id ? `${id}-${index}` : `structured-data-${index}` }
            type = "application/ld+json"
            dangerouslySetInnerHTML = { { __html: JSON.stringify(schema) } }
          />
        ))}
      </>
    )
  }

  // 单个 Schema
  return (
    <script
      { ...(id && { id }) }
      type = "application/ld+json"
      dangerouslySetInnerHTML = { { __html: JSON.stringify(data) } }
    />
  )
}

