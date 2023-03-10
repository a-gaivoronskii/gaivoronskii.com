```swift
import SwiftUI

struct User {

    struct Contacts {
        var phone: String
        var email: String
    }

    struct Location {
        var city: String
        var country: String
    }

    var name: String
    var about: String
    var contacts: Contacts
    var location: Location

    init() {
        self.name = "Andrei Gaivoronskii"
        self.about = "Making  Apps. From Russia With ♥. Fitness Enthusiast."

        self.contacts = .init(phone: "+7 911 100 01 05",
                              email: "andrei@gaivoronskii.com")

        self.location = .init(city: "Saint-Petersburg",
                              country: "Russia")
    }
}

struct MyCV {

    struct Job {
        var company: String
        var startDate: String
        var endDate: String? = nil
    }

    struct App {
        var name: String
        var link: String
    }

    var user: User
    var jobs: [Job]
    var apps: [App]

    init() {
        self.user = User()
        self.jobs = [
            .init(company: "Flow Health", startDate: "March 2022"),
            .init(company: "Beshenya Sushka", startDate: "December 2016", endDate: "October 2020"),
            .init(company: "Louis Vuitton", startDate: "September 2011", endDate: "January 2015"),
        ]
        self.apps = [
            .init(name: "RUN", link: "https://apps.apple.com/app/id1535400615"),
            .init(name: "BS365", link: "https://apps.apple.com/app/id1381169094"),
            .init(name: "Walker", link: "https://apps.apple.com/app/id1455639400"),
            .init(name: "Wallet", link: "https://apps.apple.com/app/id1038175626"),
            .init(name: "Fitness", link: "https://apps.apple.com/app/id1097500008"),
            .init(name: "QR Code", link: "https://apps.apple.com/app/id1604886331"),
            .init(name: "Activity", link: "https://apps.apple.com/app/id1427590589"),
        ]
    }
}

struct ContentView: View {

    private let myCV = MyCV()

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 8) {
                userView()
                locationView()
                contactsView()
                experienceView()
                applicationsView()
            }
            .padding()
        }
    }

    @ViewBuilder private func userView() -> some View {
        Text(myCV.user.name)
            .font(.title)
            .fontWeight(.bold)

        Text(myCV.user.about)
            .padding(.vertical)
            .foregroundColor(.secondary)
    }

    @ViewBuilder private func titleView(title: String) -> some View {
        Divider()
        Text(title)
            .underline()
            .font(.headline)
    }

    @ViewBuilder private func locationView() -> some View {
        titleView(title: "Location:")
        Text("\(myCV.user.location.city), \(myCV.user.location.country)")
        Spacer()
    }

    @ViewBuilder private func contactsView() -> some View {
        titleView(title: "Contacts:")
        HStack {
            Image(systemName: "phone.fill")
            Text(myCV.user.contacts.phone)
        }
        HStack {
            Image(systemName: "envelope.fill")
            Text(myCV.user.contacts.email)
        }
        Spacer()
    }

    @ViewBuilder private func experienceView() -> some View {
        titleView(title: "Experience:")

        ForEach(myCV.jobs, id: \.company) { job in
            VStack(alignment: .leading, spacing: 8) {
                Text(job.company)
                    .font(.system(size: 20, weight: .semibold, design: .monospaced))
                Text("\(job.startDate) - \(job.endDate ?? "Present")")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            .padding(.bottom)
        }
    }

    @ViewBuilder private func applicationsView() -> some View {
        titleView(title: "Applications:")

        LazyVGrid(columns: columns, alignment: .leading, spacing: 12) {
            ForEach(myCV.apps, id: \.name) { app in
                if let url = URL(string: app.link) {
                    Link(app.name, destination: url)
                        .font(.system(size: 20, weight: .semibold, design: .monospaced))
                }
            }
        }
    }

    private let columns = [
        GridItem(.flexible()),
        GridItem(.flexible()),
    ]
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```
