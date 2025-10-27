// import React, { useRef, useState, useEffect, memo } from 'react'
// import { motion, useInView } from 'framer-motion'

// // ============================================================================
// // Utility: Extract text from React nodes
// // ============================================================================

// export function getTextFromNode(node: React.ReactNode): string {
//     if (node === null || node === undefined) return ''
//     if (typeof node === 'string' || typeof node === 'number') return String(node)
//     if (Array.isArray(node)) return node.map(n => getTextFromNode(n)).join('')
//     if (React.isValidElement(node)) {
//         const el = node as React.ReactElement<any, any>
//         return getTextFromNode(el.props.children)
//     }
//     return String(node)
// }

// // ============================================================================
// // CombinationLockCell Component
// // ============================================================================

// type CombinationLockCellProps = {
//     children?: React.ReactNode
//     isInView: boolean
//     delay: number
//     className?: string
//     minHeight?: string
// }

// export const CombinationLockCell = memo(function CombinationLockCell({
//     children,
//     isInView,
//     delay,
//     className,
//     minHeight,
// }: CombinationLockCellProps) {
//     const [displayValue, setDisplayValue] = useState('')
//     const targetText = getTextFromNode(children ?? '')
//     const intervalRef = useRef<number | null>(null)
//     const timeoutRef = useRef<number | null>(null)

//     useEffect(() => {
//         if (timeoutRef.current) clearTimeout(timeoutRef.current)
//         if (intervalRef.current) clearInterval(intervalRef.current)

//         if (!isInView) {
//             setDisplayValue(targetText)
//             return
//         }

//         setDisplayValue(targetText)

//         timeoutRef.current = window.setTimeout(() => {
//             const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*'
//             const duration = 600
//             const steps = 20
//             const stepDuration = Math.max(10, Math.floor(duration / steps))
//             let currentStep = 0

//             intervalRef.current = window.setInterval(() => {
//                 if (currentStep < steps) {
//                     const progress = currentStep / steps
//                     const revealedLength = Math.floor(targetText.length * progress)

//                     let newValue = ''
//                     for (let i = 0; i < targetText.length; i++) {
//                         if (i < revealedLength) {
//                             newValue += targetText[i]
//                         } else {
//                             newValue += chars[Math.floor(Math.random() * chars.length)]
//                         }
//                     }
//                     setDisplayValue(newValue)
//                     currentStep++
//                 } else {
//                     setDisplayValue(targetText)
//                     if (intervalRef.current) {
//                         clearInterval(intervalRef.current)
//                         intervalRef.current = null
//                     }
//                 }
//             }, stepDuration)
//         }, delay * 1000)

//         return () => {
//             if (timeoutRef.current) clearTimeout(timeoutRef.current)
//             if (intervalRef.current) clearInterval(intervalRef.current)
//         }
//     }, [isInView, delay, targetText])

//     let content: React.ReactNode
//     if (React.isValidElement(children)) {
//         content = React.cloneElement(children as React.ReactElement<any, any>, {
//             children: displayValue || targetText,
//         })
//     } else {
//         content = displayValue || targetText
//     }

//     return (
//         <motion.td
//             layout={false} // avoid framer animating layout which causes jumps
//             initial={{ opacity: 0, y: 4 }}
//             animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 4 }}
//             transition={{ duration: 0.25, delay }}
//             className={className}
//             style={minHeight ? { minHeight } : undefined}
//         >
//             {/* reserve height on this inner wrapper so content changes don't change row height */}
//             <div
//                 className="flex items-center justify-center min-h-12 whitespace-normal wrap-break-words"
//                 style={minHeight ? { minHeight, overflow: 'hidden' } : undefined}
//             >
//                 {content}
//             </div>
//         </motion.td>
//     )
// })


// // ============================================================================
// // AnimatedTableRow Component
// // ============================================================================

// type AnimatedTableRowProps = {
//     children: React.ReactNode
//     index: number
//     isInView: boolean
//     baseDelay?: number
//     cellDelay?: number
//     className?: string
// }

// export const AnimatedTableRow = memo(function AnimatedTableRow({
//     children,
//     index,
//     isInView,
//     baseDelay = 0,
//     cellDelay = 0.15,
//     className,
// }: AnimatedTableRowProps) {
//     const childrenArray = React.Children.toArray(children)
//     const numCells = childrenArray.length

//     return (
//         <motion.tr
//             whileHover={{
//                 backgroundColor: '#F0FBFF',
//                 transition: { duration: 0.2 },
//             }}
//             className={className}
//         >
//             {childrenArray.map((child, cellIndex) => {
//                 if (!React.isValidElement(child)) return child

//                 const delay = baseDelay + index * (cellDelay * numCells + 0.1) + cellIndex * cellDelay

//                 return React.cloneElement(child as React.ReactElement<any>, {
//                     key: cellIndex,
//                     isInView,
//                     delay,
//                 })
//             })}
//         </motion.tr>
//     )
// })

// // ============================================================================
// // DataTable Component
// // ============================================================================

// type Column = {
//     key: string
//     header: React.ReactNode
//     headerClassName?: string
//     cellClassName?: string
//     render?: (value: any, row: any) => React.ReactNode
// }

// type DataTableProps = {
//     columns: Column[]
//     data: any[]
//     isInView: boolean
//     className?: string
//     headerClassName?: string
//     rowClassName?: (index: number) => string
//     tableStyle?: React.CSSProperties
//     colWidths?: string[]
//     baseDelay?: number
// }

// export const DataTable = memo(function DataTable({
//     columns,
//     data,
//     isInView,
//     className = '',
//     headerClassName = '',
//     rowClassName = (index) => index % 2 === 0 ? 'bg-white' : 'bg-[#FAFDFF]',
//     tableStyle,
//     colWidths,
//     baseDelay = 0,
// }: DataTableProps) {
//     const tableRef = useRef<HTMLTableElement | null>(null)
//     const [colPixelWidths, setColPixelWidths] = useState<number[] | null>(null)

//     useEffect(() => {
//         if (!tableRef.current) return
//         const table = tableRef.current

//         const measure = () => {
//             const headerCells = Array.from(table.querySelectorAll('thead th')) as HTMLElement[]
//             if (headerCells.length === columns.length) {
//                 setColPixelWidths(headerCells.map(h => h.getBoundingClientRect().width))
//             } else {
//                 // fallback: use table width divided evenly
//                 const tableW = table.getBoundingClientRect().width || 800
//                 setColPixelWidths(new Array(columns.length).fill(tableW / columns.length))
//             }
//         }

//         measure()
//         const ro = new ResizeObserver(() => measure())
//         ro.observe(table)
//         return () => ro.disconnect()
//     }, [columns.length])

//     // heuristics for text measurement
//     const avgCharWidth = 8 // px — tweak to match your font (8 works for many UI fonts)
//     const lineHeightPx = 20 // px — tweak to match your tailwind line-height

//     return (
//         <div className={`overflow-x-auto lg:overflow-x-visible no-scrollbar ${className}`}>
//             <table ref={tableRef} className="w-full" style={{ ...tableStyle, tableLayout: 'auto' }}>
//                 {colWidths && (
//                     <colgroup>
//                         {colWidths.map((width, i) => (
//                             <col key={i} style={{ width }} />
//                         ))}
//                     </colgroup>
//                 )}
//                 <thead>
//                     <tr className={headerClassName}>
//                         {columns.map((col) => (
//                             <th
//                                 key={col.key}
//                                 className={col.headerClassName || 'px-4 sm:px-6 py-3 sm:py-4 text-center font-bold text-white text-sm sm:text-base whitespace-normal wrap-break-words'}
//                             >
//                                 {col.header}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((row, rowIndex) => (
//                         <AnimatedTableRow
//                             key={rowIndex}
//                             index={rowIndex}
//                             isInView={isInView}
//                             baseDelay={baseDelay}
//                             className={`border-t border-[#E6F7FF] ${rowClassName(rowIndex)} transition-colors duration-200`}
//                         >
//                             {columns.map((col, colIndex) => {
//                                 // estimate text length for this cell
//                                 const rendered = col.render ? col.render(row[col.key], row) : row[col.key]
//                                 const text = getTextFromNode(rendered ?? '')
//                                 // chars per line based on measured column width (fallback to 40)
//                                 const colWidthPx = colPixelWidths ? (colPixelWidths[colIndex] ?? (colPixelWidths[0] ?? 400)) : 400
//                                 const charsPerLine = Math.max(10, Math.floor(colWidthPx / avgCharWidth))
//                                 const lines = Math.max(1, Math.ceil((text.length || 0) / charsPerLine))
//                                 const minHeightPx = Math.max(48, lines * lineHeightPx)

//                                 return (
//                                     <CombinationLockCell
//                                         key={col.key}
//                                         className={col.cellClassName || 'px-4 sm:px-6 py-3 sm:py-4 text-center'}
//                                         isInView={isInView}
//                                         delay={0}
//                                         minHeight={`${minHeightPx}px`}
//                                     >
//                                         {rendered}
//                                     </CombinationLockCell>
//                                 )
//                             })}
//                         </AnimatedTableRow>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     )
// })

// // ============================================================================
// // TableCard Component
// // ============================================================================

// type TableCardProps = {
//     title?: string
//     children: React.ReactNode
//     className?: string
//     contentClassName?: string
// }

// export const TableCard = memo(function TableCard({
//     title,
//     children,
//     className = '',
//     contentClassName = '',
// }: TableCardProps) {
//     return (
//         <div className={`bg-white rounded-2xl shadow-xl border border-[#B3E5FC] overflow-hidden ${className}`}>
//             {title && (
//                 <div className="p-4 sm:p-6 border-b border-[#E6F7FF]">
//                     <h4 className="text-lg font-semibold text-[#005F8C]">{title}</h4>
//                 </div>
//             )}
//             <div className={`p-4 sm:p-6 ${contentClassName}`}>
//                 {children}
//             </div>
//         </div>
//     )
// })

// // ============================================================================
// // Badge Component
// // ============================================================================

// type BadgeProps = {
//     children: React.ReactNode
//     variant?: 'primary' | 'secondary' | 'danger' | 'success'
//     className?: string
//     animated?: boolean
// }

// export const Badge = memo(function Badge({
//     children,
//     variant = 'primary',
//     className = '',
//     animated = false,
// }: BadgeProps) {
//     const variantStyles = {
//         primary: 'text-[#00A0E3] bg-[#E6F7FF]',
//         secondary: 'text-slate-700 bg-slate-100',
//         danger: 'text-[#DC2626] bg-red-50',
//         success: 'text-emerald-600 bg-emerald-50',
//     }

//     const content = (
//         <span
//             className={`inline-flex items-center justify-center font-bold text-xs sm:text-sm px-2 py-1 rounded min-w-[100px] min-h-8 ${variantStyles[variant]} ${className}`}
//         >
//             {children}
//         </span>
//     )

//     if (animated) {
//         return (
//             <motion.span whileHover={{ scale: 1.05 }}>
//                 {content}
//             </motion.span>
//         )
//     }

//     return content
// })
