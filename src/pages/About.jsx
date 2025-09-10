import React from 'react'

const About = () => {
  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Về FurEver Care</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#666', marginBottom: '30px' }}>
            FurEver Care được thành lập với sứ mệnh mang đến những dịch vụ chăm sóc thú cưng tốt nhất, 
            kết nối cộng đồng những người yêu thú cưng và tạo ra một môi trường an toàn, hạnh phúc cho 
            những người bạn bốn chân của chúng ta.
          </p>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666', marginBottom: '30px' }}>
            Chúng tôi tin rằng mỗi thú cưng đều xứng đáng được yêu thương và chăm sóc tốt nhất. 
            Với đội ngũ chuyên gia giàu kinh nghiệm và tình yêu thương động vật, chúng tôi cam kết 
            mang đến những dịch vụ chất lượng cao nhất.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>2020</div>
              <div style={{ color: '#666' }}>Thành lập</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>1000+</div>
              <div style={{ color: '#666' }}>Thú cưng được chăm sóc</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>50+</div>
              <div style={{ color: '#666' }}>Tỉnh thành</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
