export default {
  name: 'atsScore',
  title: 'ATS Score',
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
      title: 'ATS Analysis Result',
      type: 'object',
      description: 'The result of the ATS analysis',
      fields: [
        {
          name: 'contactInformation',
          type: 'object',
          fields: [
            { name: 'fullName', type: 'string' },
            { name: 'phoneNumber', type: 'string' },
            { name: 'email', type: 'string' },
            { name: 'location', type: 'string' },
          ],
        },
        {
          name: 'professionalSummary',
          type: 'text',
        },
        {
          name: 'workExperience',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'jobTitle', type: 'string' },
                { name: 'companyName', type: 'string' },
                { name: 'location', type: 'string' },
                { name: 'dates', type: 'string' },
                { name: 'responsibilities', type: 'array', of: [{ type: 'string' }] },
              ],
            },
          ],
        },
        {
          name: 'education',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'degree', type: 'string' },
                { name: 'institution', type: 'string' },
                { name: 'graduationDate', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'skills',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'certifications',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'projects',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string' },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'volunteerExperience',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'organization', type: 'string' },
                { name: 'role', type: 'string' },
                { name: 'description', type: 'text' },
              ],
            },
          ],
        },
        {
          name: 'professionalAssociations',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'additionalSections',
          type: 'object',
          fields: [
            { name: 'languages', type: 'array', of: [{ type: 'string' }] },
            { name: 'publications', type: 'array', of: [{ type: 'string' }] },
            { name: 'awards', type: 'array', of: [{ type: 'string' }] },
          ],
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