import jsPDF from "jspdf"
import "jspdf-autotable"
import * as XLSX from "xlsx"

// Exportar eventos a PDF
export const exportEventsToPDF = (events, userInfo, options = {}) => {
  const doc = new jsPDF()

  // Configuración
  const title = options.title || "Reporte de Eventos"
  const subtitle = options.subtitle || `Generado el ${new Date().toLocaleDateString("es-ES")}`

  // Encabezado
  doc.setFontSize(20)
  doc.setTextColor(239, 68, 68) // Color rojo del tema
  doc.text(title, 20, 30)

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(subtitle, 20, 40)

  // Información del usuario
  if (userInfo) {
    doc.setFontSize(10)
    doc.text(`Usuario: ${userInfo.name} (${userInfo.email})`, 20, 50)
  }

  // Preparar datos para la tabla
  const tableData = events.map((event) => [
    event.title,
    event.startDate.toLocaleDateString("es-ES"),
    event.startDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    event.endDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }),
    event.category || "General",
    event.priority || "Media",
    event.location || "-",
  ])

  // Crear tabla
  doc.autoTable({
    head: [["Evento", "Fecha", "Inicio", "Fin", "Categoría", "Prioridad", "Ubicación"]],
    body: tableData,
    startY: 60,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [239, 68, 68],
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [249, 249, 249],
    },
  })

  // Estadísticas
  const finalY = doc.lastAutoTable.finalY + 20
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text("Estadísticas", 20, finalY)

  doc.setFontSize(10)
  doc.text(`Total de eventos: ${events.length}`, 20, finalY + 10)

  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category || "General"
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  let yPos = finalY + 20
  Object.entries(eventsByCategory).forEach(([category, count]) => {
    doc.text(`${category}: ${count} eventos`, 20, yPos)
    yPos += 8
  })

  // Pie de página
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(150, 150, 150)
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 10)
  }

  return doc
}

// Exportar eventos a Excel
export const exportEventsToExcel = (events, userInfo, options = {}) => {
  const workbook = XLSX.utils.book_new()

  // Hoja de eventos
  const eventsData = events.map((event) => ({
    Título: event.title,
    Descripción: event.description || "",
    "Fecha de Inicio": event.startDate.toLocaleDateString("es-ES"),
    "Hora de Inicio": event.startDate.toLocaleTimeString("es-ES"),
    "Fecha de Fin": event.endDate.toLocaleDateString("es-ES"),
    "Hora de Fin": event.endDate.toLocaleTimeString("es-ES"),
    Categoría: event.category || "General",
    Prioridad: event.priority || "Media",
    Ubicación: event.location || "",
    Asistentes: event.attendees ? event.attendees.join(", ") : "",
    Recordatorio: event.reminderDate ? event.reminderDate.toLocaleString("es-ES") : "No",
    Creado: new Date(event.createdAt).toLocaleString("es-ES"),
    Actualizado: new Date(event.updatedAt).toLocaleString("es-ES"),
  }))

  const eventsSheet = XLSX.utils.json_to_sheet(eventsData)
  XLSX.utils.book_append_sheet(workbook, eventsSheet, "Eventos")

  // Hoja de estadísticas
  const eventsByCategory = events.reduce((acc, event) => {
    const category = event.category || "General"
    acc[category] = (acc[category] || 0) + 1
    return acc
  }, {})

  const eventsByPriority = events.reduce((acc, event) => {
    const priority = event.priority || "Media"
    acc[priority] = (acc[priority] || 0) + 1
    return acc
  }, {})

  const statsData = [
    { Métrica: "Total de Eventos", Valor: events.length },
    { Métrica: "", Valor: "" },
    { Métrica: "Por Categoría", Valor: "" },
    ...Object.entries(eventsByCategory).map(([category, count]) => ({
      Métrica: category,
      Valor: count,
    })),
    { Métrica: "", Valor: "" },
    { Métrica: "Por Prioridad", Valor: "" },
    ...Object.entries(eventsByPriority).map(([priority, count]) => ({
      Métrica: priority,
      Valor: count,
    })),
  ]

  if (userInfo) {
    statsData.unshift(
      { Métrica: "Usuario", Valor: userInfo.name },
      { Métrica: "Email", Valor: userInfo.email },
      { Métrica: "Fecha de Exportación", Valor: new Date().toLocaleString("es-ES") },
      { Métrica: "", Valor: "" },
    )
  }

  const statsSheet = XLSX.utils.json_to_sheet(statsData)
  XLSX.utils.book_append_sheet(workbook, statsSheet, "Estadísticas")

  return workbook
}

// Exportar sesiones de usuario a PDF
export const exportSessionsToPDF = (sessions, userInfo) => {
  const doc = new jsPDF()

  // Encabezado
  doc.setFontSize(20)
  doc.setTextColor(239, 68, 68)
  doc.text("Reporte de Sesiones", 20, 30)

  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text(`Generado el ${new Date().toLocaleDateString("es-ES")}`, 20, 40)

  if (userInfo) {
    doc.setFontSize(10)
    doc.text(`Usuario: ${userInfo.name} (${userInfo.email})`, 20, 50)
  }

  // Preparar datos
  const tableData = sessions.map((session) => [
    new Date(session.loginTime).toLocaleDateString("es-ES"),
    new Date(session.loginTime).toLocaleTimeString("es-ES"),
    session.ip || "N/A",
    session.userAgent ? session.userAgent.substring(0, 50) + "..." : "N/A",
  ])

  // Crear tabla
  doc.autoTable({
    head: [["Fecha", "Hora", "IP", "Navegador"]],
    body: tableData,
    startY: 60,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [239, 68, 68],
      textColor: 255,
    },
  })

  return doc
}

// Descargar archivo
export const downloadFile = (content, filename, type = "pdf") => {
  if (type === "pdf") {
    content.save(filename)
  } else if (type === "excel") {
    XLSX.writeFile(content, filename)
  }
}
