export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'file',
      title: 'Resume File',
      type: 'file'
    },
    {
      name: 'formattedFileSize',
      title: 'File Size',
      type: 'string',
    },
    {
      name: 'uploadedAt',
      title: 'Uploaded At',
      type: 'datetime',
    },
    {
      name: 'extractedText',
      title: 'Extracted Text',
      type: 'text',
      description: 'The extracted text content from the PDF resume',
    },
    {
      name: 'analysisResult',
      title: 'Analysis Result',
      type: 'object',
      description: 'The result of the resume analysis',
      fields: [
        {
          name: 'issues',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'type', type: 'string' },
                { name: 'description', type: 'string' },
                { name: 'suggestion', type: 'string' },
              ],
              preview: {
                select: {
                  title: 'type',
                  subtitle: 'description'
                }
              }
            },
          ],
          options: {
            sortable: true
          }
        },
        {
          name: 'strengths',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            sortable: true
          }
        },
        {
          name: 'overallScore',
          type: 'number',
        },
      ],
    },
    {
      name: 'fileHash',
      title: 'File Hash',
      type: 'string',
      description: 'MD5 hash of the uploaded file',
    },
  ],
}