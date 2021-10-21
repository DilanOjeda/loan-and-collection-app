
const {format} = require('date-fns');
const es = require('date-fns/locale/es');

const customTableOptions = {
    headBackground : '#212529',
    headColor : '#FFF',
    headFontSize : 11,
    border:  null,
    width: "fill_body",
    striped: true,
    stripedColors: ["#F5F5F5", "#FFF"],
    cellsPadding: 8,
    marginLeft: 20,
    marginRight: 20,
    headAlign: 'center',
    cellsFontSize : 11,
}

function generateHeaderLoanDetails(doc, customer, loan) {
    doc.setDocumentHeader({ height: '25%' }, () => {
        let titleLeftX = 80, titleY = 60;
        doc
            .fontSize(14).font('Helvetica-Bold').text("REPORTE DE PRESTAMO POR CLIENTE", titleLeftX, titleY, { align: "center" })
            .font('Helvetica').fontSize(11)
            .text(`Fecha del Reporte: ${format(new Date(), 'EEE, dd-MMM-yyyy', {locale: es})}`, titleLeftX, titleY=titleY+25)
            .text(`Prestatario: ${customer.names} ${customer.lastNames}`, titleLeftX, titleY+15)
            .moveDown();

        let detailLeftX = 100, detailRightX = 340, detailY=140, lineY=120;
        doc.fontSize(12).text(`Detalles`, 50, lineY, { align: "center" })
        doc.moveTo(80, lineY = lineY+15).lineTo(560, lineY).stroke();
        doc
            .fontSize(11).text(`Monto Prestado: ${loan.creditAmount} Bs.`, detailLeftX, detailY)
            .text(`Interes del Prestamo: ${loan.interestRate} %`, detailLeftX, detailY = detailY+15)
            .text(`Nº de Cuototas: ${loan.numberFees}`, detailLeftX, detailY = detailY+15)
            .text(`Monto x Cuota: ${loan.feeAmount} Bs`, detailLeftX, detailY = detailY+15)
    
            .text(`Modalidad de Pago: ${loan.modality}`, detailRightX, detailY=140)
            .text(`Fecha del Prestamo: ${format(new Date(loan.loanDate.replace('-', '/')), 'EEE, dd-MMM-yyyy', {locale: es})}`, detailRightX, detailY = detailY+15)
            .text(`Estado del Prestamo: ${loan.loanStatus? 'Cancelado' : 'Sin Cancelar'}`, detailRightX, detailY = detailY+15)
            .moveDown();
        doc.moveTo(80, lineY = lineY+65).lineTo(560, lineY).stroke().moveDown();
    });    
}

const generateTableLoanFees = (doc, fees) => {
    let tableRows = [];
    fees.forEach(fee => {
        tableRows.push({
            numberFee: fee.numberFee, 
            feeAmount: fee.feeAmount, 
            feePaymentDate: fee.feePaymentDate, 
            feeStatus: fee.feeStatus ? 'Cancelado' : 'Sin Cancelar' 
        });
    });

    doc.addTable([
        {key: 'numberFee', label: 'Nº Cuota', align: 'center'},
        {key: 'feeAmount', label: 'Total Pagar', align: 'center'},
        {key: 'feePaymentDate', label: 'Fecha Pago', align: 'center'},
        {key: 'feeStatus', label: 'Estado', align: 'center'}
    ],
    tableRows, customTableOptions);
}

module.exports = {
    generateHeaderLoanDetails,
    generateTableLoanFees,
}
