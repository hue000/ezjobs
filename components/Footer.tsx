'use client'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary">ezjobs</h3>
            <p className="text-gray-400 mb-4">
              孟加拉领先的在线招聘平台
            </p>
            <p className="text-gray-400 text-sm">
              连接企业与人才，让招聘更简单
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-lg">联系我们</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+8801XXXXXXXXX" className="hover:text-white transition-colors">
                  +880 1XXX-XXXXXX
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a
                  href="https://wa.me/8801XXXXXXXXX"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📧</span>
                <a
                  href="mailto:info@ezjobs.com"
                  className="hover:text-white transition-colors"
                >
                  info@ezjobs.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 text-lg">关注我们</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/ezjobs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <span className="text-xl">f</span>
              </a>
              <a
                href="https://linkedin.com/company/ezjobs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                aria-label="LinkedIn"
              >
                <span className="text-xl">in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            © 2026 ezjobs. All rights reserved.
          </p>
          <div className="flex justify-center gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">
              隐私政策
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
