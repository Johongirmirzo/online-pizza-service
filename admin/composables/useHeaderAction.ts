
import { exportToPDF } from "#imports";
import { pdfOptions } from "~/config/pdfOptions";
import xlsx from 'xlsx/xlsx';
// import { utils, writeFileXLSX } from "xlsx";


export const useHeaderAction = ()=>{
    const csv = ref();
    const generateCSV = <T extends {}>(dataList: T[]) => {
        console.log("IT's working")
        const worksheetHeader = Object.keys(
          dataList.reduce((t, el) => ({ ...t, ...el }), {})
        );
        const worksheetBody = dataList.map((applicant) => {
          const applicantVals = Object.values(applicant);
          const arrApplicantItems = [];
          for (const applicantVal of applicantVals) {
            arrApplicantItems.push(applicantVal);
          }
          return arrApplicantItems;
        });
        
        const ws = xlsx.utils.aoa_to_sheet([worksheetHeader, ...worksheetBody]);
        const CSV = xlsx.utils.sheet_to_csv(ws, {
          RS: "\n",
        });
        csv.value = CSV;
    };

    const generateExcel = (applicantsPdfTable: HTMLElement | undefined, excelName: string, sheetName: string)=>{
      xlsx.writeFileXLSX(
          xlsx.utils.table_to_book(applicantsPdfTable),
            `${excelName}.xlsx`,
            {
              sheet: sheetName,
              cellDates: true,
            }
          );
    };

    const generatePDF = (applicantTableName: string, applicantsPDFTable: HTMLElement | undefined)=>{
        exportToPDF(`${applicantTableName}.pdf`, applicantsPDFTable, pdfOptions);
    }

    return {csv, generateCSV, generateExcel, generatePDF}
}