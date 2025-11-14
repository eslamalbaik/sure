export const mockSubmitToZoho = async (data: any) => {
  console.log("🧪 MOCK: Simulating Zoho submission...");
  console.log("📤 Data to be sent:", JSON.stringify(data, null, 2));
  
  const zohoData = {
    Name: data.name,
    Email: data.email,
    FileNumber: data.fileNumber,
    Phone: data.mobile,
    LastVisit: data.lastVisit,
    Question: data.question,
    AttachmentsLinks: data.attachmentUrls && data.attachmentUrls.length > 0 
      ? data.attachmentUrls.join("\n") 
      : "",
  };
  
  console.log("📤 Formatted for Zoho:", JSON.stringify(zohoData, null, 2));
  
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    message: "Submission to Zoho successful (MOCK)",
    zohoResult: {
      code: 3000,
      message: "Success",
      data: {
        ID: "MOCK_" + Date.now()
      }
    }
  };
};


