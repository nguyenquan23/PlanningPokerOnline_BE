const loadServer = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: {
        message: 'OK',
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      data: err,
    });
  }
};

export default { loadServer };
